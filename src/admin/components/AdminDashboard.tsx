import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  LogOut,
  GripVertical,
  Loader2,
  ExternalLink,
  LayoutGrid,
  ArrowLeft,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";
import {
  fetchAllProjects,
  createProject,
  deleteProject,
  updateProject,
  reorderProjects,
  logout,
} from "../../lib/api";
import { ProjectForm } from "./ProjectForm";
import { ThemeToggle } from "../../components/ThemeToggle";
import type { Project } from "../../types/project";

interface AdminDashboardProps {
  onLogout: () => void;
}

type View = "list" | "create" | "edit";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const notify = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllProjects();
      setProjects(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects from server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const confirmDelete = async () => {
    if (!deletingProject || !deletingProject._id) return;
    setIsDeleting(true);
    setError(null);
    try {
      await deleteProject(deletingProject._id);
      setProjects((prev) => prev.filter((p) => p._id !== deletingProject._id));
      notify(`Project "${deletingProject.title}" was deleted.`);
      setDeletingProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (project: Project) => {
    if (!project._id) return;
    const newStatus = !project.published;
    const updated = { ...project, published: newStatus };

    // Optimistic UI update
    setProjects((prev) => prev.map((p) => (p._id === project._id ? updated : p)));
    setActionLoadingId(project._id);

    try {
      await updateProject(project._id, { published: newStatus });
      notify(`"${project.title}" is now ${newStatus ? "Live" : "Draft"}.`);
    } catch (err) {
      // Revert on error
      setProjects((prev) => prev.map((p) => (p._id === project._id ? project : p)));
      setError(err instanceof Error ? err.message : "Failed to update project status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDragStart = (index: number) => setDragging(index);
  const handleDragEnter = (index: number) => setDragOver(index);

  const handleDrop = async (dropIndex: number) => {
    if (dragging === null || dragging === dropIndex) {
      setDragging(null);
      setDragOver(null);
      return;
    }

    const next = [...projects];
    const [item] = next.splice(dragging, 1);
    next.splice(dropIndex, 0, item);
    const reordered = next.map((p, i) => ({ ...p, order: i + 1 }));

    setProjects(reordered);
    setDragging(null);
    setDragOver(null);

    try {
      await reorderProjects(reordered.map((p) => ({ _id: p._id!, order: p.order! })));
      notify("Project order updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project reordering.");
      load();
    }
  };

  const handleCreate = async (data: Partial<Project>) => {
    await createProject(data);
    setView("list");
    notify(`Created project "${data.title}".`);
    load();
  };

  const handleUpdate = async (data: Partial<Project>) => {
    if (!editing?._id) return;
    await updateProject(editing._id, data);
    setView("list");
    setEditing(null);
    notify(`Updated project "${data.title}".`);
    load();
  };

  // ── Form views: Create & Edit ────────────────────────────────────────────────

  if (view === "create") {
    return (
      <div className="min-h-screen bg-background text-foreground px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setView("list")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to projects</span>
          </button>

          <div className="mb-8">
            <h1
              className="text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              Add New Project
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new case study to your portfolio with images, overview, and process steps.
            </p>
          </div>

          <ProjectForm onSubmit={handleCreate} onCancel={() => setView("list")} />
        </div>
      </div>
    );
  }

  if (view === "edit" && editing) {
    return (
      <div className="min-h-screen bg-background text-foreground px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setView("list");
              setEditing(null);
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to projects</span>
          </button>

          <div className="mb-8">
            <h1
              className="text-3xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              Edit Project
            </h1>
            <p className="text-sm text-muted-foreground mt-1 truncate">
              Editing: <span className="font-medium text-foreground">{editing.title}</span>
            </p>
          </div>

          <ProjectForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => {
              setView("list");
              setEditing(null);
            }}
          />
        </div>
      </div>
    );
  }

  // ── List view ────────────────────────────────────────────────────────────────

  const liveCount = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 px-4 py-8 md:px-8 relative overflow-hidden">
      {/* Background accent glow blobs */}
      <div
        className="pointer-events-none fixed -top-40 right-0 w-[600px] h-[500px] opacity-40"
        style={{
          background: "radial-gradient(ellipse at top right, hsl(24 95% 53% / 0.12) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 -left-40 w-[500px] h-[400px] opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(24 95% 53% / 0.08) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Top Header Navigation Bar ── */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 text-accent shadow-xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1
                  className="text-2xl font-bold tracking-tight text-foreground"
                  style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
                >
                  Admin Dashboard
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/80 text-muted-foreground border border-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {projects.length} Total
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {liveCount} live
                </span>{" "}
                · <span>{draftCount} draft</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <ThemeToggle />

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:bg-muted/50 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </header>

        {/* ── Notification & Error alerts ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 px-4 py-3.5 rounded-xl border border-red-500/25 bg-red-500/10 text-xs text-red-600 dark:text-red-400 flex items-center justify-between"
            >
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-500/80 hover:text-red-500 text-xs font-bold ml-4"
              >
                Dismiss
              </button>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 px-4 py-3.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Action bar: Add Project ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2
              className="text-lg font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              Projects & Case Studies
            </h2>
            <p className="text-xs text-muted-foreground">
              Drag rows to reorder how projects appear on your public portfolio.
            </p>
          </div>

          <button
            onClick={() => setView("create")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all text-sm shadow-md shadow-accent/25 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* ── Table Container ── */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-28 text-center space-y-3">
            <Loader2 className="w-7 h-7 text-accent animate-spin" />
            <p className="text-sm text-muted-foreground">Loading projects from database…</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-12 text-center text-muted-foreground space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border flex items-center justify-center mx-auto text-muted-foreground">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">No projects found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your portfolio currently has no case studies loaded from MongoDB.
              </p>
            </div>
            <button
              onClick={() => setView("create")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-xl text-xs font-medium hover:bg-accent/90 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Project</span>
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-border overflow-hidden bg-card/75 backdrop-blur-md shadow-sm">
            {/* Table Header: matching CSS grid on desktop */}
            <div className="hidden md:grid md:grid-cols-[1fr_140px_280px] items-center px-6 py-4 border-b border-border bg-muted/40 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              <span>Project</span>
              <span className="text-center">Status</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border/60">
              <AnimatePresence initial={false}>
                {projects.map((project, index) => {
                  const isActionLoading = actionLoadingId === project._id;

                  return (
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
                        "flex flex-col gap-4 p-4 md:p-0 md:grid md:grid-cols-[1fr_140px_280px] md:items-center md:px-6 md:py-4 transition-colors cursor-grab active:cursor-grabbing",
                        dragOver === index
                          ? "bg-accent/10 border-l-4 border-l-accent"
                          : "hover:bg-muted/30",
                      ].join(" ")}
                    >
                      {/* ── 1. PROJECT Column: drag handle + strictly constrained 80px × 56px thumbnail + stacked text ── */}
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Drag Handle */}
                        <div className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground/40 hover:text-foreground transition-colors shrink-0">
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Strict 80px × 56px Thumbnail Wrapper */}
                        <div
                          className="w-20 h-14 min-w-[80px] min-h-[56px] max-w-[80px] max-h-[56px] rounded-lg border border-border bg-muted overflow-hidden shrink-0 flex items-center justify-center relative shadow-xs"
                          style={{
                            width: "80px",
                            height: "56px",
                            minWidth: "80px",
                            minHeight: "56px",
                            maxWidth: "80px",
                            maxHeight: "56px",
                          }}
                        >
                          {project.images?.[0] ? (
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-lg"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                          )}
                        </div>

                        {/* Stacked title, category & year */}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-foreground truncate leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {project.category || "Uncategorized"}
                          </p>
                          <p className="text-[11px] text-muted-foreground/70 mt-0.5 tabular-nums">
                            {project.year || "—"} {project.client ? `· ${project.client}` : ""}
                          </p>
                        </div>
                      </div>

                      {/* ── 2. STATUS Column: styled pill badge ── */}
                      <div className="flex items-center justify-between md:justify-center">
                        <span className="text-xs text-muted-foreground md:hidden font-medium">Status:</span>
                        <span
                          className={[
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold leading-none border transition-colors",
                            project.published
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25"
                              : "bg-muted/70 text-muted-foreground border-border",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "w-1.5 h-1.5 rounded-full",
                              project.published
                                ? "bg-emerald-500 animate-pulse"
                                : "bg-muted-foreground/50",
                            ].join(" ")}
                          />
                          {project.published ? "Live" : "Draft"}
                        </span>
                      </div>

                      {/* ── 3. ACTIONS Column: clearly labeled, well-spaced buttons ── */}
                      <div className="flex items-center justify-end gap-2 shrink-0 pt-2 border-t border-border/40 md:pt-0 md:border-t-0">
                        {/* Publish / Unpublish Button */}
                        <button
                          onClick={() => handleTogglePublish(project)}
                          disabled={isActionLoading}
                          className={[
                            "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50",
                            project.published
                              ? "border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
                          ].join(" ")}
                        >
                          {isActionLoading
                            ? "Updating…"
                            : project.published
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setEditing(project);
                            setView("edit");
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted/60 hover:border-foreground/30 transition-all active:scale-[0.98] cursor-pointer"
                        >
                          Edit
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingProject(project)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-red-500/25 text-red-500 hover:text-red-600 hover:bg-red-500/10 hover:border-red-500/40 transition-all active:scale-[0.98] cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground/60 gap-2">
          <span>Drag rows to reorder · Changes persist automatically to database</span>
          <span>Logged in as Administrator</span>
        </div>
      </div>

      {/* ── Delete Confirmation Dialog Modal ── */}
      <AnimatePresence>
        {deletingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full rounded-2xl border border-border bg-card p-6 shadow-2xl relative"
            >
              <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <h3
                className="text-xl font-bold tracking-tight text-foreground mb-2"
                style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
              >
                Delete Case Study?
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-foreground">
                  "{deletingProject.title}"
                </span>
                ? This action will permanently remove the project from MongoDB and cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingProject(null)}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-[0.98] transition-all shadow-sm shadow-red-500/25 cursor-pointer disabled:opacity-50"
                >
                  {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isDeleting ? "Deleting…" : "Delete Project"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
