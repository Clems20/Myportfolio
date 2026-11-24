import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Loader2, ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react";
import { login } from "../../lib/api";
import { ThemeToggle } from "../../components/ThemeToggle";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed. Check your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative flex flex-col justify-between p-6 overflow-hidden">
      {/* Background accent glow blobs — matching main site Hero */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(24 95% 53% / 0.12) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(24 95% 53% / 0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Top navigation bar */}
      <header className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between py-2">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </a>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Center login card */}
      <main className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle top card highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {/* Icon badge */}
          <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center mb-6 text-accent shadow-sm shadow-accent/10">
            <Lock className="w-5 h-5" />
          </div>

          <div className="mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2"
              style={{ fontFamily: "'Space Grotesk', 'DM Sans', sans-serif" }}
            >
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter your admin master password to manage your portfolio case studies and project data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-sm"
                  placeholder="Enter your admin password"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 text-xs leading-relaxed"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all text-sm shadow-md shadow-accent/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Authenticating…" : "Sign In to Dashboard"}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Obinna Anyanwu · Portfolio Administration
        </p>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 text-center py-2 text-xs text-muted-foreground/60">
        Protected session · 24-hour authentication
      </footer>
    </div>
  );
}
