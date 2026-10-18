import type { VercelRequest, VercelResponse } from "@vercel/node";
import { findAll } from "../_mongo.js";
import { verifyToken, getTokenFromRequest } from "../_auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = getTokenFromRequest({
    headers: {
      authorization: req.headers.authorization as string | undefined,
      cookie: req.headers.cookie as string | undefined,
    },
  });
  if (!token || !(await verifyToken(token))) return res.status(401).json({ error: "Unauthorized" });

  try {
    const projects = await findAll({}, { order: 1 });
    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}
