import type { VercelRequest, VercelResponse } from "@vercel/node";
import { findAll, insertOne } from "../_mongo";
import { verifyToken, getTokenFromRequest } from "../_auth";
import type { Project } from "../../src/types/project";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS for local dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    // Public — return only published projects sorted by order
    try {
      const projects = await findAll({ published: true }, { order: 1 });
      return res.status(200).json(projects);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  }

  if (req.method === "POST") {
    // Protected — create new project
    const token = getTokenFromRequest({ headers: { authorization: req.headers.authorization as string | undefined, cookie: req.headers.cookie as string | undefined } });
    if (!token || !(await verifyToken(token))) return res.status(401).json({ error: "Unauthorized" });

    try {
      const body = req.body as Partial<Project>;
      // Assign order as max existing + 1
      const existing = await findAll({}, { order: -1 }) as Array<{ order?: number }>;
      const maxOrder = existing.length > 0 ? (existing[0].order ?? existing.length) : 0;

      const project: Omit<Project, "_id"> = {
        id: Date.now(), // legacy numeric id kept for URL compatibility
        title: body.title ?? "Untitled",
        category: body.category ?? "",
        year: body.year ?? String(new Date().getFullYear()),
        images: body.images ?? [],
        description: body.description ?? "",
        client: body.client,
        role: body.role ?? "",
        date: body.date ?? "",
        productLink: body.productLink,
        tools: body.tools ?? [],
        goal: body.goal ?? "",
        problem: body.problem ?? "",
        userDescription: body.userDescription ?? "",
        challenges: body.challenges ?? [],
        processSteps: body.processSteps ?? [],
        results: body.results ?? { learnings: [] },
        order: maxOrder + 1,
        published: body.published ?? false,
      };

      const insertedId = await insertOne(project);
      return res.status(201).json({ ...project, _id: insertedId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create project" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
