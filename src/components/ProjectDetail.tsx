import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { ImageSlider } from "./ImageSlider";

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
    productLink?: string;
    tools: string[];
    goal: string;
    problem: string;
    userDescription: string;
    challenges: string[];
    processSteps: {
      title: string;
      description: string;
      images: string[];
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
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 p-3 md:p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors backdrop-blur-sm touch-manipulation"
        aria-label="Close project"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="text-xs md:text-sm text-accent uppercase tracking-wider">{project.category}</span>
            <span className="text-xs md:text-sm text-muted-foreground">·</span>
            <span className="text-xs md:text-sm text-muted-foreground">{project.year}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 tracking-tight max-w-4xl">
            {project.title}
          </h1>
          
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-12">
            {project.description}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ImageSlider images={project.images} alt={project.title} aspectRatio="aspect-[16/9]" />
          </motion.div>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-24 p-4 md:p-8 rounded-2xl bg-sand/30"
        >
          {project.client && (
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Client</p>
              <p className="font-medium text-sm md:text-base">{project.client}</p>
            </div>
          )}
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Role</p>
            <p className="font-medium text-sm md:text-base">{project.role}</p>
          </div>
          {project.productLink ? (
            <div className="md:col-span-2">
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Product Website</p>
              <p className="text-xs md:text-sm mb-3 break-all text-muted-foreground">{project.productLink}</p>
              <motion.a 
                href={project.productLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 md:py-2 bg-accent text-background rounded-lg hover:bg-accent/90 active:scale-95 transition-all text-sm touch-manipulation w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                View Product
              </motion.a>
            </div>
          ) : (
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">Date</p>
              <p className="font-medium text-sm md:text-base">{project.date}</p>
            </div>
          )}
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Tools</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span key={index} className="text-xs md:text-sm px-2 py-1 rounded bg-foreground/5">
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
          className="mb-12 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">Overview</h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3 className="text-xs md:text-sm text-accent uppercase tracking-wider mb-3">Goal</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.goal}</p>
            </div>
            <div>
              <h3 className="text-xs md:text-sm text-accent uppercase tracking-wider mb-3">Problem</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-xs md:text-sm text-accent uppercase tracking-wider mb-3">Users</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.userDescription}</p>
            </div>
          </div>
        </motion.div>

        {/* Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">The Challenge</h2>
          
          <div className="space-y-4 md:space-y-6 max-w-4xl">
            {project.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex gap-3 md:gap-4"
              >
                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-xs md:text-sm">{index + 1}</span>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed pt-1">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process & Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">Process & Solution</h2>
          
          <div className="space-y-12 md:space-y-16">
            {project.processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                <ImageSlider images={step.images} alt={step.title} aspectRatio="aspect-[16/10]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Results & Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">Results & Learnings</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-lg md:text-xl mb-4 md:mb-6 text-accent">Impact & Outcomes</h3>
              <div className="space-y-3 md:space-y-4">
                {project.results.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className="p-3 md:p-4 rounded-xl bg-sand/30"
                  >
                    <p className="text-sm md:text-base text-muted-foreground">{metric}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl mb-4 md:mb-6 text-accent">Key Learnings</h3>
              <div className="space-y-3 md:space-y-4">
                {project.results.learnings.map((learning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex gap-2 md:gap-3"
                  >
                    <span className="text-accent mt-1">→</span>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{learning}</p>
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
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 pt-12 border-t border-border"
        >
          <button
            onClick={() => onNavigate('prev')}
            disabled={!hasPrev}
            className="group flex items-center justify-center sm:justify-start gap-2 px-6 py-4 sm:py-3 rounded-full bg-sand/50 hover:bg-sand active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
          >
            <ArrowLeft className="w-6 h-6 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base sm:text-sm">Previous Project</span>
          </button>
          
          <button
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className="group flex items-center justify-center sm:justify-start gap-2 px-6 py-4 sm:py-3 rounded-full bg-sand/50 hover:bg-sand active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
          >
            <span className="text-base sm:text-sm">Next Project</span>
            <ArrowRight className="w-6 h-6 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}