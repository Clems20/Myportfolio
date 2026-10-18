import type { VercelRequest, VercelResponse } from "@vercel/node";
import { findOne, updateOne, deleteOne, objectIdFilter } from "../_mongo";
import { verifyToken, getTokenFromRequest } from "../_auth";
import type { Project } from "../../src/types/project";

function authHeaders(req: VercelRequest) {
  return {
    authorization: req.headers.authorization as string | undefined,
    cookie: req.headers.cookie as string | undefined,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  const { id } = req.query as { id: string };
  if (!id) return res.status(400).json({ error: "Missing id" });

  // All methods on a specific project require auth
  const token = getTokenFromRequest({ headers: authHeaders(req) });
  if (!token || !(await verifyToken(token))) return res.status(401).json({ error: "Unauthorized" });

  const filter = objectIdFilter(id);

  if (req.method === "GET") {
    try {
      const project = await findOne(filter);
      if (!project) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(project);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch project" });
    }
  }

  if (req.method === "PUT") {
    try {
      const body = req.body as Partial<Project>;
      // Strip _id from the update payload — MongoDB won't allow updating the immutable _id
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...fields } = body as Project & { _id?: string };
      await updateOne(filter, { $set: fields });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update project" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await deleteOne(filter);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete project" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
