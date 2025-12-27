import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    category: string;
    year: string;
    images: string[];
    description: string;
    client?: string;
    role: string;
    date: string;
    tools: string[];
    goal: string;
    problem: string;
    userDescription: string;
    challenges: string[];
    processSteps: {
      title: string;
      description: string;
      image: string;
    }[];
    results: {
      metrics: string[];
      learnings: string[];
    };
  };
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ProjectDetail({ project, onClose, onNavigate, hasPrev, hasNext }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors backdrop-blur-sm"
        aria-label="Close project"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-accent uppercase tracking-wider">{project.category}</span>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight max-w-4xl">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mb-12">
            {project.description}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-sand"
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 p-8 rounded-2xl bg-sand/30"
        >
          {project.client && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Client</p>
              <p className="font-medium">{project.client}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Role</p>
            <p className="font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Date</p>
            <p className="font-medium">{project.date}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Tools</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span key={index} className="text-sm px-2 py-1 rounded bg-foreground/5">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Project Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl mb-12">Overview</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm text-accent uppercase tracking-wider mb-3">Goal</h3>
              <p className="text-muted-foreground leading-relaxed">{project.goal}</p>
            </div>
            <div>
              <h3 className="text-sm text-accent uppercase tracking-wider mb-3">Problem</h3>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-sm text-accent uppercase tracking-wider mb-3">Users</h3>
              <p className="text-muted-foreground leading-relaxed">{project.userDescription}</p>
            </div>
          </div>
        </motion.div>

        {/* Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl mb-12">The Challenge</h2>
          
          <div className="space-y-6 max-w-4xl">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-sm">{index + 1}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed pt-1">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process & Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl mb-12">Process & Solution</h2>
          
          <div className="space-y-16">
            {project.processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="space-y-6"
              >
                <div className="max-w-3xl">
                  <h3 className="text-2xl mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-sand">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results & Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-24"
        >
          <h2 className="text-3xl md:text-4xl mb-12">Results & Learnings</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl mb-6 text-accent">Impact & Outcomes</h3>
              <div className="space-y-4">
                {project.results.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="p-4 rounded-xl bg-sand/30"
                  >
                    <p className="text-muted-foreground">{metric}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl mb-6 text-accent">Key Learnings</h3>
              <div className="space-y-4">
                {project.results.learnings.map((learning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="text-accent mt-1">→</span>
                    <p className="text-muted-foreground leading-relaxed">{learning}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-between pt-12 border-t border-border"
        >
          <button
            onClick={() => onNavigate('prev')}
            disabled={!hasPrev}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-sand/50 hover:bg-sand transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Project</span>
          </button>
          
          <button
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-sand/50 hover:bg-sand transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Next Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
