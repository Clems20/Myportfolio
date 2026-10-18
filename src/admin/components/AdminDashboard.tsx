import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, LogOut, GripVertical, Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react";
import { fetchAllProjects, createProject, deleteProject, updateProject, reorderProjects, logout } from "../../lib/api";
import { ProjectForm } from "./ProjectForm";
import type { Project } from "../../types/project";

interface AdminDashboardProps {
  onLogout: () => void;
}

type View = "list" | "create" | "edit";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [view, setView]           = useState<View>("list");
  const [editing, setEditing]     = useState<Project | null>(null);
  const [dragOver, setDragOver]   = useState<number | null>(null);
  const [dragging, setDragging]   = useState<number | null>(null);

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

  const handleLogout = () => {
    logout();
    onLogout();
  };

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
      setProjects((prev) => prev.map((p) => p._id === project._id ? project : p)); // revert
    }
  };

  // ── Drag-to-reorder ──────────────────────────────────────────────────────────

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
      load(); // reload on failure
    }
  };

  // ── Form submit ──────────────────────────────────────────────────────────────

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

  // ── Render ───────────────────────────────────────────────────────────────────

  if (view === "create") {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => setView("list")} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition">
            ← Back to projects
          </button>
          <h1 className="text-2xl tracking-tight mb-8">Add Project</h1>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setView("list")} />
        </div>
      </div>
    );
  }

  if (view === "edit" && editing) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 md:px-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => { setView("list"); setEditing(null); }} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 transition">
            ← Back to projects
          </button>
          <h1 className="text-2xl tracking-tight mb-8">Edit — {editing.title}</h1>
          <ProjectForm initial={editing} onSubmit={handleUpdate} onCancel={() => { setView("list"); setEditing(null); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your portfolio projects</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
              <ExternalLink className="w-4 h-4" /> View site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Add button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setView("create")}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add project
          </button>
        </div>

        {/* Project list */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-accent animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-4">No projects yet.</p>
            <button onClick={() => setView("create")} className="text-accent hover:text-accent/80 transition">
              Add your first project →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 pb-2 text-xs text-muted-foreground uppercase tracking-wider">
              <span></span>
              <span>Project</span>
              <span>Status</span>
              <span className="hidden sm:block">Year</span>
              <span>Actions</span>
            </div>

            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project._id ?? project.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-center p-4 rounded-xl border transition cursor-grab active:cursor-grabbing ${
                    dragOver === index ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/30"
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />

                  <div className="min-w-0 flex items-center gap-3">
                    {project.images[0] && (
                      <img src={project.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{project.category}</p>
                    </div>
                  </div>

                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.published ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted text-muted-foreground"
                  }`}>
                    {project.published ? "Live" : "Draft"}
                  </span>

                  <span className="hidden sm:block text-xs text-muted-foreground">{project.year}</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                      title={project.published ? "Unpublish" : "Publish"}
                    >
                      {project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditing(project); setView("edit"); }}
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-8">
          Drag rows to reorder. Changes save automatically.
        </p>
      </div>
    </div>
  );
}
