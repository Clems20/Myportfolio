// Lightweight JWT helper using the Web Crypto API (available in Node 18+).
// Signs and verifies HS256 tokens — no external dependencies needed.

function b64url(input: ArrayBuffer): string {
  return Buffer.from(input).toString("base64url");
}

function b64urlDecode(input: string): Buffer {
  return Buffer.from(input, "base64url");
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signToken(payload: object): Promise<string> {
  const secret = process.env.JWT_SECRET!;
  const header  = b64url(new TextEncoder().encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body    = b64url(new TextEncoder().encode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 })));
  const signing = new TextEncoder().encode(`${header}.${body}`);
  const key     = await getKey(secret);
  const sig     = await crypto.subtle.sign("HMAC", key, signing);
  return `${header}.${body}.${b64url(sig)}`;
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const secret = process.env.JWT_SECRET!;
    const [headerB64, bodyB64, sigB64] = token.split(".");
    if (!headerB64 || !bodyB64 || !sigB64) return null;

    const key     = await getKey(secret);
    const signing = new TextEncoder().encode(`${headerB64}.${bodyB64}`);
    const sig     = b64urlDecode(sigB64);
    const valid   = await crypto.subtle.verify("HMAC", key, sig, signing);
    if (!valid) return null;

    const payload = JSON.parse(b64urlDecode(bodyB64).toString("utf8")) as Record<string, unknown>;
    if (typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: { headers: { authorization?: string; cookie?: string } }): string | null {
  // Check Authorization: Bearer <token>
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  // Check cookie: token=<token>
  const cookie = req.headers.cookie ?? "";
  const match = cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}
