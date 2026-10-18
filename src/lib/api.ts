// Frontend API client — wraps all fetch calls to the Vercel API routes.
// Token is read from localStorage (set after login) and sent as Authorization header.

import type { Project } from "../types/project";

const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText })) as { error?: string };
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Auth ─────────────────────────────────────────────────────────────────────

export async function login(password: string): Promise<void> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await handleResponse<{ token: string }>(res);
  localStorage.setItem("admin_token", data.token);
}

export function logout(): void {
  localStorage.removeItem("admin_token");
  fetch(`${BASE}/auth/logout`, { method: "POST" }).catch(() => {});
}

export function isLoggedIn(): boolean {
  return Boolean(getToken());
}

// ── Public projects (portfolio) ──────────────────────────────────────────────

export async function fetchPublicProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE}/projects`);
  return handleResponse<Project[]>(res);
}

// ── Admin projects ────────────────────────────────────────────────────────────

export async function fetchAllProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE}/projects/all`, { headers: authHeaders() });
  return handleResponse<Project[]>(res);
}

export async function fetchProject(id: string): Promise<Project> {
  const res = await fetch(`${BASE}/projects/${id}`, { headers: authHeaders() });
  return handleResponse<Project>(res);
}

export async function createProject(project: Partial<Project>): Promise<Project> {
  const res = await fetch(`${BASE}/projects`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  return handleResponse<Project>(res);
}

export async function updateProject(id: string, project: Partial<Project>): Promise<void> {
  const res = await fetch(`${BASE}/projects/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(project),
  });
  await handleResponse<{ ok: boolean }>(res);
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${BASE}/projects/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  await handleResponse<{ ok: boolean }>(res);
}

export async function reorderProjects(order: Array<{ _id: string; order: number }>): Promise<void> {
  const res = await fetch(`${BASE}/projects/reorder`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ order }),
  });
  await handleResponse<{ ok: boolean }>(res);
}

// ── File upload ───────────────────────────────────────────────────────────────

export async function uploadImage(file: File): Promise<string> {
  // Step 1: get a presigned PUT URL from the API
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });
  const { uploadUrl, publicUrl } = await handleResponse<{ uploadUrl: string; publicUrl: string }>(res);

  // Step 2: PUT the file directly to R2
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!uploadRes.ok) throw new Error(`R2 upload failed: ${uploadRes.status}`);

  return publicUrl;
}
