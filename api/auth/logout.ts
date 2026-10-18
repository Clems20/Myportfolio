import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Set-Cookie", "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0");
  return res.status(200).json({ ok: true });
}
