import type { VercelRequest, VercelResponse } from "@vercel/node";
import { signToken } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { password } = req.body as { password?: string };
  if (!password) return res.status(400).json({ error: "Password required" });

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ error: "Server misconfigured" });

  if (password !== expected) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = await signToken({ role: "admin" });

  // Set HttpOnly cookie (for browser) and also return in body (for fetch-based clients)
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
  );
  return res.status(200).json({ token });
}
