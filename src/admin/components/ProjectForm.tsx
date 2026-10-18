import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import type { Project, ProcessStep } from "../../types/project";

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}

const EMPTY_STEP: ProcessStep = { title: "", description: "", images: [] };

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [form, setForm]     = useState<Partial<Project>>(initial ?? {
    title: "", category: "", year: String(new Date().getFullYear()),
    images: [], description: "", role: "", date: "", tools: [],
    goal: "", problem: "", userDescription: "", challenges: [],
    processSteps: [{ ...EMPTY_STEP }],
    results: { learnings: [] },
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers for array fields ────────────────────────────────────────────────

  function setChallenge(i: number, v: string) {
    const next = [...(form.challenges ?? [])];
    next[i] = v;
    set("challenges", next);
  }
  function addChallenge()       { set("challenges", [...(form.challenges ?? []), ""]); }
  function removeChallenge(i: number) { set("challenges", (form.challenges ?? []).filter((_, j) => j !== i)); }

  function setLearning(i: number, v: string) {
    const next = [...(form.results?.learnings ?? [])];
    next[i] = v;
    set("results", { ...form.results, learnings: next });
  }
  function addLearning()       { set("results", { ...form.results, learnings: [...(form.results?.learnings ?? []), ""] }); }
  function removeLearning(i: number) { set("results", { ...form.results, learnings: (form.results?.learnings ?? []).filter((_, j) => j !== i) }); }

  function setStep(i: number, patch: Partial<ProcessStep>) {
    const next = [...(form.processSteps ?? [])];
    next[i] = { ...next[i], ...patch };
    set("processSteps", next);
  }
  function addStep()       { set("processSteps", [...(form.processSteps ?? []), { ...EMPTY_STEP }]); }
  function removeStep(i: number) { set("processSteps", (form.processSteps ?? []).filter((_, j) => j !== i)); }

  const input = "w-full px-3 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition text-sm";
  const label = "block text-sm text-muted-foreground mb-1.5";
  const section = "space-y-4 p-5 rounded-2xl border border-border bg-card/50";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-16">
      {/* Basic info */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={label}>Title *</label>
            <input className={input} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} required placeholder="Project title" />
          </div>
          <div>
            <label className={label}>Category *</label>
            <input className={input} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} required placeholder="e.g. UI UX / Product Design" />
          </div>
          <div>
            <label className={label}>Year *</label>
            <input className={input} value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} required placeholder="2025" />
          </div>
          <div>
            <label className={label}>Date</label>
            <input className={input} value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} placeholder="e.g. Jan – Mar 2025" />
          </div>
          <div>
            <label className={label}>Role *</label>
            <input className={input} value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} required placeholder="Lead UI/UX Designer" />
          </div>
          <div>
            <label className={label}>Client</label>
            <input className={input} value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} placeholder="Client name (optional)" />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Product link</label>
            <input className={input} type="url" value={form.productLink ?? ""} onChange={(e) => set("productLink", e.target.value)} placeholder="https://…" />
          </div>
          <div className="md:col-span-2">
            <label className={label}>Tools (comma-separated)</label>
            <input className={input} value={(form.tools ?? []).join(", ")} onChange={(e) => set("tools", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} placeholder="Figma, Notion" />
          </div>
        </div>
        <div>
          <label className={label}>Short description *</label>
          <textarea className={input + " resize-none h-20"} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} required placeholder="One-sentence project summary shown on the grid card" />
        </div>
        <div className="flex items-center gap-3">
          <input id="published" type="checkbox" checked={form.published ?? false} onChange={(e) => set("published", e.target.checked)} className="accent-accent w-4 h-4" />
          <label htmlFor="published" className="text-sm text-muted-foreground cursor-pointer">Published (visible on portfolio)</label>
        </div>
      </div>

      {/* Cover images */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Cover Images</h3>
        <p className="text-xs text-muted-foreground mb-3">First image is used as the card thumbnail. Drag to reorder.</p>
        <ImageUploader value={form.images ?? []} onChange={(urls) => set("images", urls)} maxImages={5} />
      </div>

      {/* Overview */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Overview</h3>
        <div className="space-y-4">
          {(["goal", "problem", "userDescription"] as const).map((field) => (
            <div key={field}>
              <label className={label}>{field === "userDescription" ? "Target users" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <textarea className={input + " resize-none h-20"} value={(form[field] as string) ?? ""} onChange={(e) => set(field, e.target.value)} placeholder={`Describe the ${field}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Objectives / challenges */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Project Objectives</h3>
        <div className="space-y-2">
          {(form.challenges ?? []).map((c, i) => (
            <div key={i} className="flex gap-2">
              <input className={input + " flex-1"} value={c} onChange={(e) => setChallenge(i, e.target.value)} placeholder={`Objective ${i + 1}`} />
              <button type="button" onClick={() => removeChallenge(i)} className="p-2 text-muted-foreground hover:text-red-500 transition" aria-label="Remove"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={addChallenge} className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition">
            <Plus className="w-4 h-4" /> Add objective
          </button>
        </div>
      </div>

      {/* Process steps */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Process Steps</h3>
        <div className="space-y-5">
          {(form.processSteps ?? []).map((step, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Step {i + 1}</span>
                <button type="button" onClick={() => removeStep(i)} className="text-muted-foreground hover:text-red-500 transition" aria-label="Remove step"><X className="w-4 h-4" /></button>
              </div>
              <input className={input} value={step.title} onChange={(e) => setStep(i, { title: e.target.value })} placeholder="Step title (e.g. User Research)" />
              <textarea className={input + " resize-none h-24"} value={step.description} onChange={(e) => setStep(i, { description: e.target.value })} placeholder="Describe what you did in this step" />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Step images</p>
                <ImageUploader value={step.images} onChange={(urls) => setStep(i, { images: urls })} maxImages={10} />
              </div>
            </div>
          ))}
          <button type="button" onClick={addStep} className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition">
            <Plus className="w-4 h-4" /> Add step
          </button>
        </div>
      </div>

      {/* Learnings */}
      <div className={section}>
        <h3 className="text-base font-medium mb-4">Lessons Learned</h3>
        <div className="space-y-2">
          {(form.results?.learnings ?? []).map((l, i) => (
            <div key={i} className="flex gap-2">
              <textarea className={input + " flex-1 resize-none h-16"} value={l} onChange={(e) => setLearning(i, e.target.value)} placeholder={`Lesson ${i + 1}`} />
              <button type="button" onClick={() => removeLearning(i)} className="p-2 text-muted-foreground hover:text-red-500 transition self-start mt-1" aria-label="Remove"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={addLearning} className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition">
            <Plus className="w-4 h-4" /> Add lesson
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition disabled:opacity-50 text-sm font-medium">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving…" : "Save project"}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
