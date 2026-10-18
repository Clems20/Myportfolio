import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPresignedPutUrl, PUBLIC_URL } from "./_r2";
import { verifyToken, getTokenFromRequest } from "./_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = getTokenFromRequest({
    headers: {
      authorization: req.headers.authorization as string | undefined,
      cookie: req.headers.cookie as string | undefined,
    },
  });
  if (!token || !(await verifyToken(token))) return res.status(401).json({ error: "Unauthorized" });

  const { filename, contentType } = req.body as { filename?: string; contentType?: string };
  if (!filename || !contentType) return res.status(400).json({ error: "filename and contentType required" });

  // Sanitize filename and make it unique
  const ext  = filename.split(".").pop() ?? "jpg";
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  const key  = `projects/${Date.now()}-${safe}.${ext}`.replace(/\.+$/, "");

  try {
    const uploadUrl = await getPresignedPutUrl(key, contentType);
    const publicUrl = `${PUBLIC_URL}/${key}`;
    return res.status(200).json({ uploadUrl, publicUrl, key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to generate upload URL" });
  }
}
