import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Plus, X, ChevronDown, Check, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import type { Project, ProcessStep } from "../../types/project";

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (data: Partial<Project>) => Promise<void>;
  onCancel: () => void;
}

const EMPTY_STEP: ProcessStep = { title: "", description: "", images: [] };

type OptionalSection = "overview" | "objectives" | "processSteps" | "metrics" | "learnings";

const SECTION_META: Record<OptionalSection, { label: string; description: string }> = {
  overview:     { label: "Overview",           description: "Goal, problem statement, and target users" },
  objectives:   { label: "Project Objectives", description: "Key design challenges and success criteria" },
  processSteps: { label: "Process Steps",      description: "Step-by-step case study narrative and design artifact images" },
  metrics:      { label: "Results & Metrics",  description: "Quantitative impact, KPIs, and user metrics" },
  learnings:    { label: "Lessons Learned",    description: "Key takeaways, reflections, and post-launch insights" },
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
      title: "",
      category: "",
      year: String(new Date().getFullYear()),
      images: [],
      description: "",
      role: "",
      date: "",
      client: "",
      productLink: "",
      tools: [],
      goal: "",
      problem: "",
      userDescription: "",
      challenges: [],
      processSteps: [{ ...EMPTY_STEP }],
      results: { metrics: [], learnings: [] },
      published: false,
    }
  );

  const [sections, setSections] = useState<Record<OptionalSection, boolean>>(
    () => deriveInitialSections(initial)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Section toggle ───────────────────────────────────────────────────────────

  function toggleSection(key: OptionalSection, enabled: boolean) {
    setSections((prev) => ({ ...prev, [key]: enabled }));
    if (!enabled) {
      if (key === "overview") {
        setForm((prev) => ({ ...prev, goal: "", problem: "", userDescription: "" }));
      }
      if (key === "objectives") {
        setForm((prev) => ({ ...prev, challenges: [] }));
      }
      if (key === "processSteps") {
        setForm((prev) => ({ ...prev, processSteps: [] }));
      }
      if (key === "metrics") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, metrics: [] } }));
      }
      if (key === "learnings") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, learnings: [] } }));
      }
    } else {
      if (key === "overview") {
        setForm((prev) => ({ ...prev, goal: prev.goal || "", problem: prev.problem || "", userDescription: prev.userDescription || "" }));
      }
      if (key === "objectives") {
        setForm((prev) => ({ ...prev, challenges: prev.challenges?.length ? prev.challenges : [""] }));
      }
      if (key === "processSteps") {
        setForm((prev) => ({ ...prev, processSteps: prev.processSteps?.length ? prev.processSteps : [{ ...EMPTY_STEP }] }));
      }
      if (key === "metrics") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, metrics: prev.results?.metrics?.length ? prev.results.metrics : [""] } }));
      }
      if (key === "learnings") {
        setForm((prev) => ({ ...prev, results: { ...prev.results, learnings: prev.results?.learnings?.length ? prev.results.learnings : [""] } }));
      }
    }
  }

  // ── Generic field setter ─────────────────────────────────────────────────────

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      setError("Project title is required.");
      return;
    }
    if (!form.category?.trim()) {
      setError("Category is required.");
      return;
    }
    if (!form.role?.trim()) {
      setError("Role is required.");
      return;
    }
    if (!form.description?.trim()) {
      setError("Short description is required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payload: Partial<Project> = { ...form };

      // Ensure disabled sections cleanly clear in database
      if (!sections.overview) {
        payload.goal = "";
        payload.problem = "";
        payload.userDescription = "";
      }
      if (!sections.objectives) {
        payload.challenges = [];
      } else {
        payload.challenges = (payload.challenges ?? []).filter((c) => c.trim().length > 0);
      }

      if (!sections.processSteps) {
        payload.processSteps = [];
      } else {
        payload.processSteps = (payload.processSteps ?? []).filter((s) => s.title.trim() || s.description.trim() || s.images.length > 0);
      }

      const resultsPayload = { ...(payload.results ?? {}) };
      if (!sections.metrics) {
        resultsPayload.metrics = [];
      } else {
        resultsPayload.metrics = (resultsPayload.metrics ?? []).filter((m) => m.trim().length > 0);
      }

      if (!sections.learnings) {
        resultsPayload.learnings = [];
      } else {
        resultsPayload.learnings = (resultsPayload.learnings ?? []).filter((l) => l.trim().length > 0);
      }
      payload.results = resultsPayload;

      await onSubmit(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  // ── Array-field helpers ──────────────────────────────────────────────────────

  function setChallenge(i: number, v: string) {
    const next = [...(form.challenges ?? [])];
    next[i] = v;
    set("challenges", next);
  }
  function addChallenge() {
    set("challenges", [...(form.challenges ?? []), ""]);
  }
  function removeChallenge(i: number) {
    set("challenges", (form.challenges ?? []).filter((_, j) => j !== i));
  }

  function setMetric(i: number, v: string) {
    const next = [...(form.results?.metrics ?? [])];
    next[i] = v;
    set("results", { ...form.results, metrics: next });
  }
  function addMetric() {
    set("results", { ...form.results, metrics: [...(form.results?.metrics ?? []), ""] });
  }
  function removeMetric(i: number) {
    set("results", { ...form.results, metrics: (form.results?.metrics ?? []).filter((_, j) => j !== i) });
  }

  function setLearning(i: number, v: string) {
    const next = [...(form.results?.learnings ?? [])];
    next[i] = v;
    set("results", { ...form.results, learnings: next });
  }
  function addLearning() {
    set("results", { ...form.results, learnings: [...(form.results?.learnings ?? []), ""] });
  }
  function removeLearning(i: number) {
    set("results", { ...form.results, learnings: (form.results?.learnings ?? []).filter((_, j) => j !== i) });
  }

  function setStep(i: number, patch: Partial<ProcessStep>) {
    const next = [...(form.processSteps ?? [])];
    next[i] = { ...next[i], ...patch };
    set("processSteps", next);
  }
  function addStep() {
    set("processSteps", [...(form.processSteps ?? []), { ...EMPTY_STEP }]);
  }
  function removeStep(i: number) {
    set("processSteps", (form.processSteps ?? []).filter((_, j) => j !== i));
  }

  // ── Style constants matching main site ────────────────────────────────────────

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm";

  const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2";

  // ── Section Card wrapper ─────────────────────────────────────────────────────

  function SectionCard({
    id,
    children,
    optional = false,
  }: {
    id: OptionalSection;
    children: React.ReactNode;
    optional?: boolean;
  }) {
    const enabled = sections[id];
    return (
      <div
        className={[
          "rounded-2xl border transition-all overflow-hidden",
          enabled
            ? "border-border bg-card/70 backdrop-blur-md shadow-sm"
            : "border-border/50 bg-muted/20 opacity-75",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
          <div>
            <h3
              className="text-base font-semibold text-foreground tracking-tight"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              {SECTION_META[id].label}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{SECTION_META[id].description}</p>
          </div>
          {optional && (
            <button
              type="button"
              onClick={() => toggleSection(id, !enabled)}
              className={[
                "flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all cursor-pointer",
                enabled
                  ? "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              ].join(" ")}
            >
              <span
                className={[
                  "w-2 h-2 rounded-full transition-colors",
                  enabled ? "bg-accent" : "bg-muted-foreground/40",
                ].join(" ")}
              />
              {enabled ? "Enabled" : "Disabled"}
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Helper buttons ───────────────────────────────────────────────────────────

  function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors pt-2 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        {label}
      </button>
    );
  }

  function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Remove item"
      >
        <X className="w-4 h-4" />
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      {/* ── 1. Basic Information ── */}
      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 shadow-sm">
        <h3
          className="text-base font-semibold text-foreground tracking-tight mb-5"
          style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
        >
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Project Title *</label>
            <input
              className={inputCls}
              value={form.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
              required
              placeholder="e.g. Delorand — All In One Commerce"
            />
          </div>

          <div>
            <label className={labelCls}>Category *</label>
            <input
              className={inputCls}
              value={form.category ?? ""}
              onChange={(e) => set("category", e.target.value)}
              required
              placeholder="e.g. UI UX / Product Design"
            />
          </div>

          <div>
            <label className={labelCls}>Year *</label>
            <input
              className={inputCls}
              value={form.year ?? ""}
              onChange={(e) => set("year", e.target.value)}
              required
              placeholder="2026"
            />
          </div>

          <div>
            <label className={labelCls}>Role *</label>
            <input
              className={inputCls}
              value={form.role ?? ""}
              onChange={(e) => set("role", e.target.value)}
              required
              placeholder="e.g. Lead Product Designer"
            />
          </div>

          <div>
            <label className={labelCls}>Client / Company</label>
            <input
              className={inputCls}
              value={form.client ?? ""}
              onChange={(e) => set("client", e.target.value)}
              placeholder="e.g. Freelance / Delorand Inc."
            />
          </div>

          <div>
            <label className={labelCls}>Date Range</label>
            <input
              className={inputCls}
              value={form.date ?? ""}
              onChange={(e) => set("date", e.target.value)}
              placeholder="e.g. May 2026"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Live Product / Prototype URL</label>
            <input
              className={inputCls}
              type="url"
              value={form.productLink ?? ""}
              onChange={(e) => set("productLink", e.target.value)}
              placeholder="https://example.com or App Store link"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Tools Used (comma separated)</label>
            <input
              className={inputCls}
              value={(form.tools ?? []).join(", ")}
              onChange={(e) =>
                set(
                  "tools",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Figma, Notion, FigJam, Principle"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelCls}>Short Description *</label>
            <textarea
              className={inputCls + " resize-none h-24 leading-relaxed"}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              required
              placeholder="Brief 1-2 sentence overview shown on the main portfolio work grid."
            />
          </div>

          {/* Published Toggle */}
          <div className="md:col-span-2 pt-2">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/60">
              <div>
                <p className="text-sm font-semibold text-foreground">Visibility Status</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {form.published
                    ? "Live — Project is visible on the public website"
                    : "Draft — Project is saved but hidden from the public website"}
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={form.published ?? false}
                onClick={() => set("published", !(form.published ?? false))}
                className={[
                  "relative w-12 h-6 rounded-full transition-colors cursor-pointer",
                  form.published ? "bg-accent" : "bg-muted border border-border",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform",
                    form.published ? "translate-x-6" : "translate-x-0",
                  ].join(" ")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Project Images ── */}
      <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-md p-6 shadow-sm">
        <h3
          className="text-base font-semibold text-foreground tracking-tight mb-1"
          style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
        >
          Project Images & Gallery
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          The first image serves as the main project card thumbnail on the portfolio grid.
        </p>
        <ImageUploader
          value={form.images ?? []}
          onChange={(urls) => set("images", urls)}
          maxImages={8}
        />
      </div>

      {/* ── 3. Optional Section: Overview ── */}
      <SectionCard id="overview" optional>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Project Goal</label>
            <textarea
              className={inputCls + " resize-none h-20"}
              value={form.goal ?? ""}
              onChange={(e) => set("goal", e.target.value)}
              placeholder="What was the primary business and product goal?"
            />
          </div>

          <div>
            <label className={labelCls}>Problem Statement</label>
            <textarea
              className={inputCls + " resize-none h-20"}
              value={form.problem ?? ""}
              onChange={(e) => set("problem", e.target.value)}
              placeholder="What core user friction or market problem did this solve?"
            />
          </div>

          <div>
            <label className={labelCls}>Target Users & Audience</label>
            <textarea
              className={inputCls + " resize-none h-20"}
              value={form.userDescription ?? ""}
              onChange={(e) => set("userDescription", e.target.value)}
              placeholder="Who are the primary target users, personas, or demographics?"
            />
          </div>
        </div>
      </SectionCard>

      {/* ── 4. Optional Section: Objectives ── */}
      <SectionCard id="objectives" optional>
        <div className="space-y-3">
          {(form.challenges ?? []).map((challenge, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-medium shrink-0">
                {i + 1}
              </span>
              <input
                className={inputCls + " flex-1"}
                value={challenge}
                onChange={(e) => setChallenge(i, e.target.value)}
                placeholder={`Objective or challenge ${i + 1}`}
              />
              <RemoveButton onClick={() => removeChallenge(i)} />
            </div>
          ))}
          <AddButton onClick={addChallenge} label="Add Objective" />
        </div>
      </SectionCard>

      {/* ── 5. Optional Section: Process Steps ── */}
      <SectionCard id="processSteps" optional>
        <div className="space-y-5">
          {(form.processSteps ?? []).map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-background/80 p-5 space-y-4 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Step {i + 1}
                </span>
                <RemoveButton onClick={() => removeStep(i)} />
              </div>

              <div>
                <label className={labelCls}>Step Title</label>
                <input
                  className={inputCls}
                  value={step.title}
                  onChange={(e) => setStep(i, { title: e.target.value })}
                  placeholder="e.g. Discovery & User Research, Wireframing, Final Design"
                />
              </div>

              <div>
                <label className={labelCls}>Step Description</label>
                <textarea
                  className={inputCls + " resize-none h-24"}
                  value={step.description}
                  onChange={(e) => setStep(i, { description: e.target.value })}
                  placeholder="Detail the activities, iterations, and decisions made in this stage..."
                />
              </div>

              <div>
                <label className={labelCls}>Step Visuals & Artifacts</label>
                <ImageUploader
                  value={step.images ?? []}
                  onChange={(urls) => setStep(i, { images: urls })}
                  maxImages={10}
                />
              </div>
            </div>
          ))}
          <AddButton onClick={addStep} label="Add Process Step" />
        </div>
      </SectionCard>

      {/* ── 6. Optional Section: Results & Metrics ── */}
      <SectionCard id="metrics" optional>
        <div className="space-y-3">
          {(form.results?.metrics ?? []).map((metric, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0 ml-1 mr-1" />
              <input
                className={inputCls + " flex-1"}
                value={metric}
                onChange={(e) => setMetric(i, e.target.value)}
                placeholder="e.g. 40% increase in checkout conversion rate"
              />
              <RemoveButton onClick={() => removeMetric(i)} />
            </div>
          ))}
          <AddButton onClick={addMetric} label="Add Impact Metric" />
        </div>
      </SectionCard>

      {/* ── 7. Optional Section: Lessons Learned ── */}
      <SectionCard id="learnings" optional>
        <div className="space-y-3">
          {(form.results?.learnings ?? []).map((learning, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="w-2 h-2 rounded-full bg-accent mt-4 shrink-0 ml-1 mr-1" />
              <textarea
                className={inputCls + " flex-1 resize-none h-20"}
                value={learning}
                onChange={(e) => setLearning(i, e.target.value)}
                placeholder={`Key takeaway or reflection ${i + 1}`}
              />
              <RemoveButton onClick={() => removeLearning(i)} />
            </div>
          ))}
          <AddButton onClick={addLearning} label="Add Lesson Learned" />
        </div>
      </SectionCard>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-7 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all font-semibold text-sm shadow-md shadow-accent/25 disabled:opacity-50 cursor-pointer"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Saving Project…" : "Save Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30 active:scale-[0.98] transition-all text-sm font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
