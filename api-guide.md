## External Clients (e.g., Go CLI): How to Connect and Use the API

This section shows how apps outside this Next.js site (like a Go CLI) authenticate and call the API to validate licenses and operate with online/offline support.

Visit the web Dashboard here: [Nextgen Theme](https://nextgen-theme.vercel.app/)

### The external‑app flow
1. User signs in on the web Dashboard (`/dashboard`).
2. User purchases a license (if needed) and uses the Dashboard to issue an API key.
3. User pastes the API key into the external app (or the app opens the Dashboard in a browser to guide the user).
4. The external app uses the API key to call the Assertion endpoint to prove entitlement and receive a short‑lived assertion token for offline grace.
5. If the key is revoked or the entitlement changes, the server response will indicate it, and the app prompts the user to re‑link.

Notes:
- API key issuance (`/api/cli/key/issue`) requires a signed‑in browser session; external apps should not call it directly.
- The only endpoint external apps need is the Assertion endpoint.

### Browser linking flow (auto login detection)
Recommended for CLIs: open the website, detect login automatically, and return an API key to the CLI without manual copy/paste.

Proposed endpoints (simple device‑link pattern):
- `POST /api/cli/link/start`
  - Body: `{ version?: string }`
  - Response: `{ code: string, link_url: string, expires_in: number }`
    - `link_url` example: `https://nextgen-theme.vercel.app/dashboard?link_code=<code>`
- `GET /api/cli/link/poll?code=<code>`
  - Response until linked: `{ status: "pending" }`
  - Response when linked: `{ status: "ready", apiKey: string, version: number }`
- `POST /api/cli/link/complete`
  - Auth: Clerk session (browser).
  - Body: `{ code: string }`
  - Action: If user is entitled, issue or fetch API key and mark the code as ready for pickup.

Minimal UX:
1) CLI calls `link/start`, opens `link_url` in the browser.
2) User signs in (if not already), the Dashboard auto‑detects `link_code` and calls `link/complete`.
3) CLI polls `link/poll` until it receives `{ apiKey }`, then stores it and immediately calls the Assertion endpoint to validate.

Security notes:
- Codes expire quickly (e.g., 5 minutes) and are single‑use.
- Store codes server‑side (KV/Redis) keyed by `code` with minimal data.
- Optionally bind code to approximate client IP or user agent to limit abuse.

CLI cURL examples for the link flow:
```bash
# 1) Start link
curl -X POST https://your.site/api/cli/link/start -H "Content-Type: application/json" -d '{"version":"1.2.3"}'

# 2) Poll until ready
curl "https://your.site/api/cli/link/poll?code=abc123"

# 3) (Browser) completes the link
curl -X POST https://your.site/api/cli/link/complete \
  -H "Content-Type: application/json" \
  --cookie "<clerk_session_cookies>" \
  -d '{"code":"abc123"}'
```

Go: open browser and poll
```go
import (
    "context"
    "encoding/json"
    "errors"
    "fmt"
    "net/http"
    "os/exec"
    "runtime"
    "time"
)

type linkStart struct { Code, LinkURL string; ExpiresIn int }
type linkPoll struct { Status string; APIKey string; Version int }

func openBrowser(url string) error {
    switch runtime.GOOS {
    case "windows": return exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
    case "darwin": return exec.Command("open", url).Start()
    default: return exec.Command("xdg-open", url).Start()
    }
}

func startLink(base string) (linkStart, error) {
    req, _ := http.NewRequest(http.MethodPost, base+"/api/cli/link/start", nil)
    req.Header.Set("Content-Type", "application/json")
    res, err := http.DefaultClient.Do(req)
    if err != nil { return linkStart{}, err }
    defer res.Body.Close()
    var out linkStart
    json.NewDecoder(res.Body).Decode(&out)
    return out, nil
}

func pollLink(base, code string, timeout time.Duration) (string, error) {
    ctx, cancel := context.WithTimeout(context.Background(), timeout)
    defer cancel()
    ticker := time.NewTicker(2 * time.Second)
    defer ticker.Stop()
    for {
        select {
        case <-ctx.Done():
            return "", errors.New("link timed out")
        case <-ticker.C:
            res, err := http.Get(base+"/api/cli/link/poll?code="+code)
            if err != nil { continue }
            var p linkPoll
            json.NewDecoder(res.Body).Decode(&p)
            res.Body.Close()
            if p.Status == "ready" && p.APIKey != "" {
                return p.APIKey, nil
            }
        }
    }
}

func LinkAndFetchAPIKey(apiBase string) (string, error) {
    ls, err := startLink(apiBase)
    if err != nil { return "", err }
    if err := openBrowser(ls.LinkURL); err != nil {
        fmt.Println("Open this URL in your browser:", ls.LinkURL)
    }
    return pollLink(apiBase, ls.Code, 5*time.Minute)
}
```

### Endpoint for external clients

- POST `/api/cli/key/assertion`
  - Headers:
    - `X-CLI-Key: <api_key>`
    - `Content-Type: application/json`
  - Body JSON:
    - `product?: string` (defaults to `"nextgen-cli"`)
    - `version?: string` (your app version for telemetry, optional)
  - Success (200):
    - `{ "assertion": "<jwt>", "expires_in": 86400 }`
      - `assertion` is a signed JWT that includes fields like `sub` (user), `product`, `plan`, `status`, and `offline_grace_hours` (typically 168 hours).
  - Failure:
    - 401 `{ error: "Missing X-CLI-Key" | "Invalid API key" | "Key revoked" }`
    - 403 `{ error: "Not entitled: <status>" | "Entitlement expired" }`
    - 429 `{ error: "Too many requests" }` (if rate limited)

### cURL example
```bash
curl -X POST https://your.site/api/cli/key/assertion \
  -H "X-CLI-Key: <api_key>" \
  -H "Content-Type: application/json" \
  -d '{"product":"nextgen-cli","version":"1.2.3"}'
```

### Go example (request, cache, and offline grace)
```go
package license

import (
    "bytes"
    "context"
    "encoding/json"
    "errors"
    "io"
    "net/http"
    "time"
)

type assertionResp struct {
    Assertion string `json:"assertion"`
    ExpiresIn int    `json:"expires_in"`
}

type Client struct {
    HTTP      *http.Client
    APIBase   string // e.g. https://your.site
    APIKey    string // stored securely
    CacheJWT  string
    CacheExp  time.Time
}

func (c *Client) FetchAssertion(ctx context.Context, product, version string) (string, error) {
    if c.HTTP == nil { c.HTTP = &http.Client{ Timeout: 10 * time.Second } }
    body, _ := json.Marshal(map[string]string{"product": product, "version": version})
    req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.APIBase+"/api/cli/key/assertion", bytes.NewReader(body))
    if err != nil { return "", err }
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("X-CLI-Key", c.APIKey)
    res, err := c.HTTP.Do(req)
    if err != nil { return c.offlineFallback(), nil }
    defer res.Body.Close()
    b, _ := io.ReadAll(res.Body)
    if res.StatusCode != 200 {
        // Handle common server messages to trigger relink
        if res.StatusCode == 401 || res.StatusCode == 403 {
            return "", errors.New("license invalid or revoked; please re‑link")
        }
        return c.offlineFallback(), nil
    }
    var ar assertionResp
    if err := json.Unmarshal(b, &ar); err != nil { return c.offlineFallback(), nil }
    c.CacheJWT = ar.Assertion
    c.CacheExp = time.Now().Add(time.Duration(ar.ExpiresIn) * time.Second)
    return ar.Assertion, nil
}

func (c *Client) offlineFallback() string {
    if c.CacheJWT != "" && time.Now().Before(c.CacheExp) {
        return c.CacheJWT
    }
    return ""
}
```

Usage pattern:
- On startup or before a protected action, call `FetchAssertion`.
- If it returns a non‑empty token, proceed; if empty, prompt the user to re‑link (open Dashboard, issue a new key, paste it back).

### Linking UX in external apps
- Provide a command like `yourapp auth login` that:
  - Opens `https://nextgen-theme.vercel.app/dashboard` in the browser.
  - Instructs the user to sign in and issue/copy the API key.
  - Prompts the user to paste the key, then stores it securely (OS keychain/credential manager).

### Key revocation and rotation
- If the user revokes keys from the Dashboard, the server returns `401 { error: "Key revoked" }`.
- Your app should catch this and prompt the user to re‑link with a new key.

### What external apps do NOT need
- Stripe checkout, portal, receipts, and verify endpoints are web‑only concerns handled by the Dashboard and webhooks. External apps only need the Assertion endpoint once the user is licensed and has an API key.



