import jwt from "jsonwebtoken";

export function signCliApiKey(userId: string, version: number) {
  return jwt.sign({ sub: userId, typ: "cli_api_key", ver: version }, process.env.API_KEY_SECRET!, {
    algorithm: "HS256", issuer: "nextgen", expiresIn: "365d",
  });
}
export function verifyCliApiKey(token: string): { sub: string; ver: number } {
  const d = jwt.verify(token, process.env.API_KEY_SECRET!, { algorithms: ["HS256"], issuer: "nextgen" }) as any;
  return { sub: d.sub, ver: d.ver };
}
export function signAssertion(payload: object) {
  const priv = process.env.JWT_PRIVATE_KEY!.replace(/\\n/g, "\n");
  return jwt.sign(payload, priv, { algorithm: "RS256", issuer: "nextgen", expiresIn: "24h" });
}
