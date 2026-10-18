import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Plus, X, ChevronDown, ToggleLeft, ToggleRight } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import type { Project, ProcessStep } from "../../types/project";

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}

const EMPTY_STEP: ProcessStep = { title: "", description: "", images: [] };

// Which optional sections exist and their display labels
type OptionalSection = "overview" | "objectives" | "processSteps" | "metrics" | "learnings";

const SECTION_META: Record<OptionalSection, { label: string; description: string }> = {
  overview:     { label: "Overview",           description: "Goal, problem statement, and target users" },
  objectives:   { label: "Project Objectives", description: "Key challenges and success criteria" },
  processSteps: { label: "Process Steps",      description: "Your design process, step by step" },
  metrics:      { label: "Results & Metrics",  description: "Quantitative outcomes and impact data" },
  learnings:    { label: "Lessons Learned",    description: "Key takeaways and reflections" },
};

function deriveInitialSections(initial?: Partial<Project>): Record<OptionalSection, boolean> {
  if (!initial) {
    return { overview: true, objectives: true, processSteps: true, metrics: false, learnings: true };
  }
  return {
    overview:
      !!(initial.goal || initial.problem || initial.userDescription),
    objectives:
      !!(initial.challenges && initial.challenges.length > 0),
    processSteps:
      !!(initial.processSteps && initial.processSteps.length > 0),
    metrics:
      !!(initial.results?.metrics && initial.results.metrics.length > 0),
    learnings:
      !!(initial.results?.learnings && initial.results.learnings.length > 0),
  };
}

export function ProjectForm({ initial, onSubmit, onCancel }: ProjectFormProps) {
  const [form, setForm] = useState<Partial<Project>>(
    initial ?? {
      title: "", category: "", year: String(new Date().getFullYear()),
      images: [], description: "", role: "", date: "", tools: [],
      goal: "", problem: "", userDescription: "", challenges: [],
      processSteps: [{ ...EMPTY_STEP }],
      results: { learnings: [] },
      published: false,
    }
  );
  const [sections, setSections] = useState<Record<OptionalSection, boolean>>(
    () => deriveInitialSections(initial)
  );
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  // ── Section toggle ───────────────────────────────────────────────────────────

  function toggleSection(key: OptionalSection, enabled: boolean) {
    setSections((prev) => ({ ...prev, [key]: enabled }));
    // When disabling, clear the associated fields so they're omitted from the payload
    if (!enabled) {
      if (key === "overview") {
        setForm((prev) => ({ ...prev, goal: undefined, problem: undefined, userDescription: undefined }));
      }
      if (key === "objectives") {
        setForm((prev) => ({ ...prev, challenges: undefined }));
      }
      if (key === "processSteps") {
        setForm((prev) => ({ ...prev, processSteps: undefined }));
      }
      if (key === "metrics") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, metrics: undefined } }));
      }
      if (key === "learnings") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, learnings: [] } }));
      }
    } else {
      // Re-initialise with empty values when re-enabling
      if (key === "overview") {
        setForm((prev) => ({ ...prev, goal: prev.goal ?? "", problem: prev.problem ?? "", userDescription: prev.userDescription ?? "" }));
      }
      if (key === "objectives") {
        setForm((prev) => ({ ...prev, challenges: prev.challenges ?? [] }));
      }
      if (key === "processSteps") {
        setForm((prev) => ({ ...prev, processSteps: prev.processSteps ?? [{ ...EMPTY_STEP }] }));
      }
      if (key === "metrics") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, metrics: prev.results?.metrics ?? [] } }));
      }
      if (key === "learnings") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, learnings: prev.results?.learnings ?? [] } }));
      }
    }
  }

  // ── Generic field setter ─────────────────────────────────────────────────────

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Strip disabled sections from the payload
      const payload: Partial<Project> = { ...form };
      if (!sections.overview)     { delete payload.goal; delete payload.problem; delete payload.userDescription; }
      if (!sections.objectives)   { delete payload.challenges; }
      if (!sections.processSteps) { delete payload.processSteps; }
      if (!sections.metrics)      payload.results = { ...payload.results, metrics: undefined };
      if (!sections.learnings)    payload.results = { ...payload.results, learnings: [] };
      await onSubmit(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ── Array-field helpers ──────────────────────────────────────────────────────

  function setChallenge(i: number, v: string) {
    const next = [...(form.challenges ?? [])]; next[i] = v; set("challenges", next);
  }
  function addChallenge()             { set("challenges", [...(form.challenges ?? []), ""]); }
  function removeChallenge(i: number) { set("challenges", (form.challenges ?? []).filter((_, j) => j !== i)); }

  function setMetric(i: number, v: string) {
    const next = [...(form.results?.metrics ?? [])]; next[i] = v;
    set("results", { ...form.results, metrics: next });
  }
  function addMetric()             { set("results", { ...form.results, metrics: [...(form.results?.metrics ?? []), ""] }); }
  function removeMetric(i: number) { set("results", { ...form.results, metrics: (form.results?.metrics ?? []).filter((_, j) => j !== i) }); }

  function setLearning(i: number, v: string) {
    const next = [...(form.results?.learnings ?? [])]; next[i] = v;
    set("results", { ...form.results, learnings: next });
  }
  function addLearning()             { set("results", { ...form.results, learnings: [...(form.results?.learnings ?? []), ""] }); }
  function removeLearning(i: number) { set("results", { ...form.results, learnings: (form.results?.learnings ?? []).filter((_, j) => j !== i) }); }

  function setStep(i: number, patch: Partial<ProcessStep>) {
    const next = [...(form.processSteps ?? [])]; next[i] = { ...next[i], ...patch }; set("processSteps", next);
  }
  function addStep()             { set("processSteps", [...(form.processSteps ?? []), { ...EMPTY_STEP }]); }
  function removeStep(i: number) { set("processSteps", (form.processSteps ?? []).filter((_, j) => j !== i)); }

  // ── Style constants ──────────────────────────────────────────────────────────

  const inputCls = [
    "w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground",
    "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40",
    "focus:border-accent/60 transition-all text-sm",
  ].join(" ");

  const labelCls = "block text-xs text-muted-foreground uppercase tracking-wider mb-2";

  // ── Section card wrapper ─────────────────────────────────────────────────────

  function SectionCard({
    id,
    children,
    optional = false,
  }: {
    id?: OptionalSection;
    children: React.ReactNode;
    optional?: boolean;
  }) {
    const enabled = id ? sections[id] : true;
    return (
      <div
        className={[
          "rounded-2xl border transition-all",
          enabled ? "border-border" : "border-border/40 opacity-60",
        ].join(" ")}
        style={{
          background: enabled
            ? "color-mix(in srgb, var(--card) 60%, transparent)"
            : "color-mix(in srgb, var(--muted) 20%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {optional && id && (
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/60">
            <div>
              <h3
                className="text-sm font-medium"
                style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
              >
                {SECTION_META[id].label}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{SECTION_META[id].description}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleSection(id, !enabled)}
              className={[
                "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all",
                enabled
                  ? "border-accent/30 bg-accent/8 text-accent hover:bg-accent/15"
                  : "border-border text-muted-foreground hover:border-foreground/20",
              ].join(" ")}
            >
              {enabled
                ? <><ToggleRight className="w-3.5 h-3.5" /> Enabled</>
                : <><ToggleLeft className="w-3.5 h-3.5" /> Disabled</>}
            </button>
          </div>
        )}
        {!optional && id && (
          <div className="px-5 pt-5 pb-4 border-b border-border/60">
            <h3
              className="text-sm font-medium"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              {SECTION_META[id].label}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{SECTION_META[id].description}</p>
          </div>
        )}
        <AnimatePresence initial={false}>
          {enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 py-5">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Add / remove item button ─────────────────────────────────────────────────

  function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition mt-1"
      >
        <Plus className="w-3.5 h-3.5" /> {label}
      </button>
    );
  }

  function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/8 rounded-lg transition-all flex-shrink-0"
        aria-label="Remove"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-16">

      {/* ── Basic Info (always shown, no toggle) ── */}
      <div
        className="rounded-2xl border border-border p-5"
        style={{
          background: "color-mix(in srgb, var(--card) 60%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <h3
          className="text-sm font-medium mb-5"
          style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
        >
          Basic Info
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} required placeholder="Project title" />
          </div>
          <div>
            <label className={labelCls}>Category *</label>
            <input className={inputCls} value={form.category ?? ""} onChange={(e) => set("category", e.target.value)} required placeholder="e.g. UI UX / Product Design" />
          </div>
          <div>
            <label className={labelCls}>Year *</label>
            <input className={inputCls} value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} required placeholder="2025" />
          </div>
          <div>
            <label className={labelCls}>Date range</label>
            <input className={inputCls} value={form.date ?? ""} onChange={(e) => set("date", e.target.value)} placeholder="e.g. Jan – Mar 2025" />
          </div>
          <div>
            <label className={labelCls}>Role *</label>
            <input className={inputCls} value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} required placeholder="Lead UI/UX Designer" />
          </div>
          <div>
            <label className={labelCls}>Client</label>
            <input className={inputCls} value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} placeholder="Client name (optional)" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Product link</label>
            <input className={inputCls} type="url" value={form.productLink ?? ""} onChange={(e) => set("productLink", e.target.value)} placeholder="https://…" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Tools (comma-separated)</label>
            <input className={inputCls} value={(form.tools ?? []).join(", ")} onChange={(e) => set("tools", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} placeholder="Figma, Notion, FigJam" />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>Short description *</label>
            <textarea
              className={inputCls + " resize-none h-20"}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              required
              placeholder="One-sentence project summary shown on the grid card"
            />
          </div>
          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
              <button
                type="button"
                role="switch"
                aria-checked={form.published ?? false}
                onClick={() => set("published", !(form.published ?? false))}
                className={[
                  "relative w-10 h-5.5 rounded-full border transition-all flex-shrink-0",
                  form.published
                    ? "bg-accent border-accent/60"
                    : "bg-muted border-border",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
                    form.published ? "translate-x-4.5" : "translate-x-0",
                  ].join(" ")}
                />
              </button>
              <span className="text-sm text-muted-foreground">
                {form.published ? "Published — visible on portfolio" : "Draft — hidden from portfolio"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* ── Cover Images (always shown) ── */}
      <div
        className="rounded-2xl border border-border p-5"
        style={{
          background: "color-mix(in srgb, var(--card) 60%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <h3
          className="text-sm font-medium mb-1"
          style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
        >
          Cover Images
        </h3>
        <p className="text-xs text-muted-foreground mb-4">First image is the card thumbnail. Drag to reorder.</p>
        <ImageUploader value={form.images ?? []} onChange={(urls) => set("images", urls)} maxImages={5} />
      </div>

      {/* ── Optional sections ── */}

      <SectionCard id="overview" optional>
        <div className="space-y-4">
          {(["goal", "problem", "userDescription"] as const).map((field) => (
            <div key={field}>
              <label className={labelCls}>
                {field === "userDescription" ? "Target users" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <textarea
                className={inputCls + " resize-none h-20"}
                value={(form[field] as string) ?? ""}
                onChange={(e) => set(field, e.target.value)}
                placeholder={`Describe the ${field === "userDescription" ? "target users" : field}`}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="objectives" optional>
        <div className="space-y-2">
          {(form.challenges ?? []).map((c, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls + " flex-1"}
                value={c}
                onChange={(e) => setChallenge(i, e.target.value)}
                placeholder={`Objective ${i + 1}`}
              />
              <RemoveButton onClick={() => removeChallenge(i)} />
            </div>
          ))}
          <AddButton onClick={addChallenge} label="Add objective" />
        </div>
      </SectionCard>

      <SectionCard id="processSteps" optional>
        <div className="space-y-4">
          {(form.processSteps ?? []).map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/80 bg-background/60 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Step {i + 1}</span>
                <RemoveButton onClick={() => removeStep(i)} />
              </div>
              <input
                className={inputCls}
                value={step.title}
                onChange={(e) => setStep(i, { title: e.target.value })}
                placeholder="Step title (e.g. User Research)"
              />
              <textarea
                className={inputCls + " resize-none h-24"}
                value={step.description}
                onChange={(e) => setStep(i, { description: e.target.value })}
                placeholder="Describe what you did in this step"
              />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Step images</p>
                <ImageUploader value={step.images} onChange={(urls) => setStep(i, { images: urls })} maxImages={10} />
              </div>
            </div>
          ))}
          <AddButton onClick={addStep} label="Add step" />
        </div>
      </SectionCard>

      <SectionCard id="metrics" optional>
        <div className="space-y-2">
          {(form.results?.metrics ?? []).map((m, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls + " flex-1"}
                value={m}
                onChange={(e) => setMetric(i, e.target.value)}
                placeholder={`Metric ${i + 1} (e.g. 40% increase in task completion)`}
              />
              <RemoveButton onClick={() => removeMetric(i)} />
            </div>
          ))}
          <AddButton onClick={addMetric} label="Add metric" />
        </div>
      </SectionCard>

      <SectionCard id="learnings" optional>
        <div className="space-y-2">
          {(form.results?.learnings ?? []).map((l, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                className={inputCls + " flex-1 resize-none h-16"}
                value={l}
                onChange={(e) => setLearning(i, e.target.value)}
                placeholder={`Lesson ${i + 1}`}
              />
              <RemoveButton onClick={() => removeLearning(i)} />
            </div>
          ))}
          <AddButton onClick={addLearning} label="Add lesson" />
        </div>
      </SectionCard>

      {/* ── Error + Actions ── */}

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-500 px-1"
        >
          {error}
        </motion.p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all disabled:opacity-50 text-sm font-medium shadow-sm shadow-accent/20"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving…" : "Save project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-foreground/25 active:scale-[0.98] transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
