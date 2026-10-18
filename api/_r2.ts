// Cloudflare R2 upload helper using the S3-compatible API.
// Generates a presigned PUT URL so the browser uploads directly to R2 —
// the Vercel function never streams the file bytes itself.

const ACCOUNT_ID      = process.env.R2_ACCOUNT_ID!;
const ACCESS_KEY_ID   = process.env.R2_ACCESS_KEY_ID!;
const SECRET_KEY      = process.env.R2_SECRET_ACCESS_KEY!;
const BUCKET          = process.env.R2_BUCKET_NAME!;
export const PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

const R2_ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

// AWS SigV4 helpers (Web Crypto — no sdk needed)
function hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sha256(data: string): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data)));
}

async function hmac256(key: ArrayBuffer | string, data: string): Promise<ArrayBuffer> {
  const k = typeof key === "string"
    ? await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
    : await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, new TextEncoder().encode(data));
}

export async function getPresignedPutUrl(key: string, contentType: string): Promise<string> {
  const now        = new Date();
  const dateStr    = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 8); // YYYYMMDD
  const amzDate    = now.toISOString().replace(/[:-]|\.\d{3}/g, "").slice(0, 15) + "Z"; // YYYYMMDDTHHmmssZ
  const region     = "auto";
  const service    = "s3";
  const scope      = `${dateStr}/${region}/${service}/aws4_request`;
  const host       = `${BUCKET}.${ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const expires    = 3600; // 1 hour

  const queryParams = new URLSearchParams({
    "X-Amz-Algorithm":     "AWS4-HMAC-SHA256",
    "X-Amz-Credential":    `${ACCESS_KEY_ID}/${scope}`,
    "X-Amz-Date":          amzDate,
    "X-Amz-Expires":       String(expires),
    "X-Amz-SignedHeaders": "host",
  });

  const canonicalRequest = [
    "PUT",
    `/${key}`,
    queryParams.toString(),
    `host:${host}\n`,
    "host",
    "UNSIGNED-PAYLOAD",
  ].join("\n");

  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    await sha256(canonicalRequest),
  ].join("\n");

  const kDate    = await hmac256(`AWS4${SECRET_KEY}`, dateStr);
  const kRegion  = await hmac256(kDate, region);
  const kService = await hmac256(kRegion, service);
  const kSigning = await hmac256(kService, "aws4_request");
  const sig      = hex(await hmac256(kSigning, stringToSign));

  return `https://${host}/${key}?${queryParams.toString()}&X-Amz-Signature=${sig}`;
}
