import type { VercelRequest, VercelResponse } from "@vercel/node";
import { updateOne, objectIdFilter } from "../_mongo.js";
import { verifyToken, getTokenFromRequest } from "../_auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "PUT") return res.status(405).json({ error: "Method not allowed" });

  const token = getTokenFromRequest({
    headers: {
      authorization: req.headers.authorization as string | undefined,
      cookie: req.headers.cookie as string | undefined,
    },
  });
  if (!token || !(await verifyToken(token))) return res.status(401).json({ error: "Unauthorized" });

  // Expects body: { order: [{ _id: string, order: number }] }
  const { order } = req.body as { order: Array<{ _id: string; order: number }> };
  if (!Array.isArray(order)) return res.status(400).json({ error: "Invalid body — expected { order: [{ _id, order }] }" });

  try {
    await Promise.all(
      order.map(({ _id, order: newOrder }) =>
        updateOne(objectIdFilter(_id), { $set: { order: newOrder } }),
      ),
    );
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to reorder projects" });
  }
}
