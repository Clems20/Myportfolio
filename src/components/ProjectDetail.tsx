import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, X, Maximize2 } from "lucide-react";
import { ImageSlider } from "./ImageSlider";
import { useState } from "react";

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
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background"
    >
      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors backdrop-blur-sm touch-manipulation z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-full max-h-full object-contain rounded-lg md:rounded-xl"
          />
        </motion.div>
      )}

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
          <div>
            <p className="text-xs md:text-sm text-muted-foreground mb-2">Year</p>
            <p className="font-medium text-sm md:text-base">{project.year}</p>
          </div>
          {project.productLink && (
            <div className="flex items-end">
              <motion.a 
                href={project.productLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-accent text-background rounded-lg hover:bg-accent/90 active:scale-95 transition-all text-sm touch-manipulation w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Live Site
              </motion.a>
            </div>
          )}
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
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">Project Objectives</h2>
          
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

        {/* Process Steps */}
        {project.processSteps.map((step, index) => {
          const isFinalDesign = step.title.toLowerCase().includes('final design');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="mb-12 md:mb-24"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">{step.title}</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 md:mb-12 max-w-3xl">
                {step.description}
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                {isFinalDesign ? (
                  <div className="space-y-4 md:space-y-6">
                    {step.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 + imgIndex * 0.1 }}
                        className="group relative w-full rounded-lg md:rounded-xl overflow-hidden bg-sand/30"
                      >
                        <img
                          src={image}
                          alt={`${step.title} ${imgIndex + 1}`}
                          className="w-full h-auto object-contain cursor-pointer"
                          onClick={() => setFullscreenImage(image)}
                        />
                        
                        {/* Fullscreen Expand Indicator */}
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenImage(image);
                          }}
                          className="absolute top-4 left-4 p-2.5 rounded-full bg-background/80 hover:bg-background text-foreground transition-all backdrop-blur-sm shadow-lg lg:opacity-0 lg:group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Expand to fullscreen"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <ImageSlider images={step.images} alt={step.title} aspectRatio="aspect-[16/10]" />
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Results & Lessons Learned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12 md:mb-24"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 md:mb-12">Lessons Learned</h2>
          
          <div className="max-w-4xl">
            <div className="space-y-4 md:space-y-6">
              {project.results.learnings.map((learning, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="flex gap-3 md:gap-4"
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{learning}</p>
                </motion.div>
              ))}
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