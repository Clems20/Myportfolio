#!/usr/bin/env node
// seed-projects.mjs
// Run ONCE to migrate the hardcoded project array into MongoDB.
//
// Usage:
//   node --env-file=.env seed-projects.mjs
//
// Required env vars (copy .env.example -> .env and fill in values):
//   MONGODB_URI        — e.g. mongodb+srv://user:pass@cluster.mongodb.net/
//   MONGODB_DATABASE   — default: "portfolio"
//
// Set PUBLISH_ALL=true to immediately publish all seeded projects.
// After seeding, open /admin to add full project details.

import { MongoClient } from "mongodb";

// ── Read env ─────────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE    = process.env.MONGODB_DATABASE ?? "portfolio";
const PUBLISH_ALL = process.env.PUBLISH_ALL === "true";

if (!MONGODB_URI) {
  console.error("❌  Set MONGODB_URI before running.");
  console.error("    Example: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/");
  process.exit(1);
}

// ── Project stubs ─────────────────────────────────────────────────────────────
// Images reference the existing /public/ paths — they still work as static assets.
// Full rich content can be added via the admin panel after seeding.

const PROJECTS = [
  { id: 1,  title: "Fima",                                          category: "UI UX / Product Design", year: "2025-2026", images: ["/fimacasestudy/cover.webp", "/fimacasestudy/cover2.webp"], description: "Designed a user-friendly utility app that enables users to buy data, airtime, electricity, and cable subscriptions seamlessly" },
  { id: 2,  title: "Delorand E-commerce Website",                   category: "Product Design",          year: "2022-2026", images: ["/delorand/cover.webp"],                                    description: "Designing the e-commerce experience to seamlessly blend premium fashion shopping with engaging social features." },
  { id: 3,  title: "Vera Budgeting App",                            category: "UI UX / Product Design", year: "2026",      images: ["/vera/cover.webp"],                                        description: "Vera is a mobile app designed to help users manage their personal finances, set budgets, and track spending with ease." },
  { id: 4,  title: "GMC: Web3 Agricultural NFT & Reward Platform",  category: "UI UX / Product Design", year: "2025",      images: ["/gmc/cover.webp"],                                        description: "GMC is a responsive web platform that helps people invest in agriculture using crypto assets." },
  { id: 5,  title: "BJT Wedding Website",                           category: "UI UX / Product Design", year: "2025",      images: ["/bjt/cover.webp"],                                         description: "A custom wedding website to tell their story, host a live stream, and manage RSVPs and gifts online." },
  { id: 6,  title: "Web3 Agricultural NFT & Reward Platform",       category: "UI UX / Product Design", year: "2025",      images: ["/agrinft/cover.webp"],                                     description: "Merging the deeply grounded world of agriculture with the limitless potential of Web3 and digital collectibles." },
  { id: 7,  title: "Food Delivery App",                             category: "UI UX / Product Design", year: "2025",      images: ["/food/cover.webp"],                                        description: "A visually stunning, effortless mobile food delivery experience." },
  { id: 8,  title: "Charis Microfinance Portal",                    category: "UI UX / Product Design", year: "2025",      images: ["/charis/cover.webp"],                                      description: "Reimagining group lending and microfinance management into a seamlessly stress free digital ecosystem." },
  { id: 9,  title: "Chop Lotto Redesign",                           category: "UI UX / Product Design", year: "2023",      images: ["/choplotto/cover.webp"],                                   description: "Improve user engagement, visual appeal, and clarity of the Chop Lotto website." },
  { id: 10, title: "Wallpaper App",                                 category: "UI UX / Product Design", year: "2026",      images: ["/wallpaper/cover.webp"],                                   description: "A beautifully minimal, visually immersive wallpaper discovery experience." },
];

// ── Seed ──────────────────────────────────────────────────────────────────────

async function main() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✅  Connected to MongoDB.");

    const db  = client.db(DATABASE);
    const col = db.collection("projects");

    const existing = await col.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️   Collection already has ${existing} document(s). Skipping seed to avoid duplicates.`);
      console.log("    Drop the collection in Atlas first if you want to re-seed.");
      return;
    }

    console.log(`🌱  Seeding ${PROJECTS.length} projects (published=${PUBLISH_ALL})…`);

    for (let i = 0; i < PROJECTS.length; i++) {
      const p = PROJECTS[i];
      const doc = {
        ...p,
        role:            "",
        date:            "",
        tools:           [],
        goal:            "",
        problem:         "",
        userDescription: "",
        challenges:      [],
        processSteps:    [],
        results:         { learnings: [] },
        order:           i + 1,
        published:       PUBLISH_ALL,
      };
      const result = await col.insertOne(doc);
      console.log(`  ✓  [${i + 1}/${PROJECTS.length}] ${p.title}  →  ${result.insertedId}`);
    }

    console.log("\n✅  Seed complete. Open /admin to fill in details for each project.");
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
