import crypto from "crypto";

export type LinkStatus = "pending" | "ready" | "completed" | "expired";

export type LinkRecord = {
  code: string;
  status: LinkStatus;
  createdAtMs: number;
  expiresAtMs: number;
  // Filled when completed by the browser
  userId?: string;
  apiKey?: string;
  version?: number;
};

class InMemoryLinkStore {
  private codeToRecord: Map<string, LinkRecord> = new Map();
  private ttlMs: number;

  constructor(ttlSeconds: number) {
    this.ttlMs = Math.max(60, ttlSeconds) * 1000; // minimum 60s safety
    // periodic cleanup (best-effort)
    setInterval(() => this.cleanupExpired(), 60_000).unref?.();
  }

  public createLink(): LinkRecord {
    const code = this.generateCode();
    const now = Date.now();
    const rec: LinkRecord = {
      code,
      status: "pending",
      createdAtMs: now,
      expiresAtMs: now + this.ttlMs,
    };
    this.codeToRecord.set(code, rec);
    return rec;
  }

  public get(code: string): LinkRecord | undefined {
    const rec = this.codeToRecord.get(code);
    if (!rec) return undefined;
    if (Date.now() > rec.expiresAtMs) {
      rec.status = "expired";
      // leave it for a short period; cleanup task will remove it
    }
    return rec;
  }

  public complete(code: string, payload: { userId: string; apiKey: string; version: number }): LinkRecord | undefined {
    const rec = this.get(code);
    if (!rec || rec.status === "expired") return undefined;
    rec.status = "ready";
    rec.userId = payload.userId;
    rec.apiKey = payload.apiKey;
    rec.version = payload.version;
    return rec;
  }

  public consume(code: string): LinkRecord | undefined {
    const rec = this.get(code);
    if (!rec || rec.status !== "ready") return undefined;
    rec.status = "completed";
    // keep minimal metadata until TTL; clients should discard code after pickup
    return rec;
  }

  private cleanupExpired(): void {
    const now = Date.now();
    for (const [code, rec] of this.codeToRecord.entries()) {
      if (now > rec.expiresAtMs || rec.status === "completed") {
        this.codeToRecord.delete(code);
      }
    }
  }

  private generateCode(): string {
    // URL-safe short code
    return crypto.randomBytes(9).toString("base64url");
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __nextgen_link_store: InMemoryLinkStore | undefined;
}

const defaultTtlSec = parseInt(process.env.CLI_LINK_TTL_SEC || "300", 10);
const store = global.__nextgen_link_store || new InMemoryLinkStore(defaultTtlSec);
if (!global.__nextgen_link_store) {
  global.__nextgen_link_store = store;
}

export function getLinkStore(): InMemoryLinkStore {
  return store;
}


