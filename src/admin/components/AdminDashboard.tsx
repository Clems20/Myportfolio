import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, LogOut, GripVertical, Loader2, ExternalLink, LayoutGrid } from "lucide-react";
import { fetchAllProjects, createProject, deleteProject, updateProject, reorderProjects, logout } from "../../lib/api";
import { ProjectForm } from "./ProjectForm";
import type { Project } from "../../types/project";

interface AdminDashboardProps {
  onLogout: () => void;
}

type View = "list" | "create" | "edit";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [view, setView]         = useState<View>("list");
  const [editing, setEditing]   = useState<Project | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllProjects();
      setProjects(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleLogout = () => { logout(); onLogout(); };

  const handleDelete = async (project: Project) => {
    if (!project._id) return;
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(project._id);
      setProjects((prev) => prev.filter((p) => p._id !== project._id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleTogglePublish = async (project: Project) => {
    if (!project._id) return;
    const updated = { ...project, published: !project.published };
    setProjects((prev) => prev.map((p) => p._id === project._id ? updated : p));
    try {
      await updateProject(project._id, { published: updated.published });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      setProjects((prev) => prev.map((p) => p._id === project._id ? project : p));
    }
  };

  const handleDragStart = (index: number) => setDragging(index);
  const handleDragEnter = (index: number) => setDragOver(index);

  const handleDrop = async (dropIndex: number) => {
    if (dragging === null || dragging === dropIndex) { setDragging(null); setDragOver(null); return; }
    const next = [...projects];
    const [item] = next.splice(dragging, 1);
    next.splice(dropIndex, 0, item);
    const reordered = next.map((p, i) => ({ ...p, order: i + 1 }));
    setProjects(reordered);
    setDragging(null);
    setDragOver(null);
    try {
      await reorderProjects(reordered.map((p) => ({ _id: p._id!, order: p.order! })));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reorder failed");
      load();
    }
  };

  const handleCreate = async (data: Partial<Project>) => {
    await createProject(data);
    setView("list");
    load();
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editing?._id) return;
    await updateProject(editing._id, data);
    setView("list");
    setEditing(null);
    load();
  };

  // ── Shared back button ───────────────────────────────────────────────────────

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-7 group"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
      Back to projects
    </button>
  );

  // ── Form views ───────────────────────────────────────────────────────────────

  if (view === "create") {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={() => setView("list")} />
          <div className="mb-8">
            <h1 className="text-2xl tracking-tight" style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}>
              Add Project
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Fill in the details below to add a new case study.</p>
          </div>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setView("list")} />
        </div>
      </div>
    );
  }

  if (view === "edit" && editing) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="max-w-3xl mx-auto">
          <BackButton onClick={() => { setView("list"); setEditing(null); }} />
          <div className="mb-8">
            <h1 className="text-2xl tracking-tight" style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}>
              Edit Project
            </h1>
            <p className="text-sm text-muted-foreground mt-1 truncate">{editing.title}</p>
          </div>
          <ProjectForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => { setView("list"); setEditing(null); }}
          />
        </div>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────

  const liveCount  = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      {/* Background accent glow */}
      <div
        className="pointer-events-none fixed top-0 right-0 w-[600px] h-[400px] opacity-30"
        style={{
          background: "radial-gradient(ellipse at top right, hsl(24 95% 53% / 0.08) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
              <LayoutGrid className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h1 className="text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}>
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {liveCount} live · {draftCount} draft
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Log out
            </button>
          </div>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-sm text-red-500"
          >
            {error}
          </motion.div>
        )}

        {/* ── Add project button ── */}
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setView("create")}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all text-sm font-medium shadow-sm shadow-accent/20"
          >
            <Plus className="w-4 h-4" /> Add project
          </button>
        </div>

        {/* ── Table ── */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-5 h-5 text-accent animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="text-sm mb-3">No projects yet.</p>
            <button onClick={() => setView("create")} className="text-sm text-accent hover:text-accent/80 transition">
              Add your first project →
            </button>
          </div>
        ) : (
          <div
            className="rounded-2xl border border-border overflow-hidden"
            style={{
              background: "color-mix(in srgb, var(--card) 70%, transparent)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[32px_1fr_100px_auto] gap-4 items-center px-5 py-3 border-b border-border bg-muted/30">
              <span />
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Project</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-center">Status</span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium text-right">Actions</span>
            </div>

            {/* Rows */}
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project._id ?? project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: dragging === index ? 0.45 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  className={[
                    "grid grid-cols-[32px_1fr_100px_auto] gap-4 items-center px-5 py-4 transition-all cursor-grab active:cursor-grabbing",
                    index < projects.length - 1 ? "border-b border-border/60" : "",
                    dragOver === index
                      ? "bg-accent/6 border-l-2 border-l-accent"
                      : "hover:bg-muted/25",
                  ].join(" ")}
                >
                  {/* Drag handle */}
                  <GripVertical className="w-4 h-4 text-muted-foreground/30 hover:text-muted-foreground/70 transition flex-shrink-0" />

                  {/* PROJECT column — thumbnail + title + category */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0 border border-border bg-muted">
                      {project.images?.[0] ? (
                        <img
                          src={project.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{project.category}</p>
                      <p className="text-[11px] text-muted-foreground/60 mt-0.5 tabular-nums">{project.year}</p>
                    </div>
                  </div>

                  {/* STATUS column */}
                  <div className="flex justify-center">
                    <span
                      className={[
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium leading-none",
                        project.published
                          ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-muted text-muted-foreground border border-border",
                      ].join(" ")}
                    >
                      {project.published ? "● Live" : "○ Draft"}
                    </span>
                  </div>

                  {/* ACTIONS column */}
                  <div className="flex items-center gap-2 justify-end flex-shrink-0">
                    {/* Publish / Unpublish */}
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className={[
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.97]",
                        project.published
                          ? "border border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground"
                          : "border border-emerald-500/30 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
                      ].join(" ")}
                    >
                      {project.published ? "Unpublish" : "Publish"}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => { setEditing(project); setView("edit"); }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/25 transition-all active:scale-[0.97]"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(project)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-500/70 hover:text-red-500 hover:bg-red-500/8 hover:border-red-500/35 transition-all active:scale-[0.97]"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="text-[11px] text-muted-foreground/50 text-center mt-6">
          Drag rows to reorder · Changes save automatically
        </p>
      </div>
    </div>
  );
}
