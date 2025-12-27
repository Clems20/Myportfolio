import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { DecorativeBackground } from "./DecorativeBackground";

const projects = [
  {
    id: 1,
    title: "Finance Dashboard Redesign",
    category: "Product Design",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1766503206606-27de0861e8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3OTc4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1748609339084-ea43ec1b8fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2Njg1MDIwOHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1762279389020-eeeb69c25813?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydHMlMjBncmFwaHN8ZW58MXx8fHwxNzY2ODUwMjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Redesigning a complex dashboard to help users understand their finances at a glance"
  },
  {
    id: 2,
    title: "Collaborative Workspace Platform",
    category: "UX Strategy",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzY2NzAwMzAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1764123108291-0f48d2c7e563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBjb2xsYWJvcmF0aW9uJTIwdG9vbHN8ZW58MXx8fHwxNzY2ODUwMjEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1580983558189-84200466afb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya3NwYWNlJTIwZGVzaWdufGVufDF8fHx8MTc2Njg1MDIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Building a unified workspace that brings teams together without the complexity"
  },
  {
    id: 3,
    title: "Mobile Banking for Gen Z",
    category: "Mobile Design",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1641862039942-5815d8f74938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vYmlsZSUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjY3OTc4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1681826291722-70bd7e9e6fc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwYXBwfGVufDF8fHx8MTc2Njc0ODg4NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1765226410758-9ae3d34cd791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwbW9iaWxlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2Njg0NTA4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Making banking feel less like a chore and more like a helpful companion"
  }
];

export function WorkGrid() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});

  // Auto-scroll images when hovering over a project
  useEffect(() => {
    if (selectedProject === null) {
      return;
    }

    const project = projects.find(p => p.id === selectedProject);
    if (!project || project.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndexes(prev => ({
        ...prev,
        [selectedProject]: ((prev[selectedProject] || 0) + 1) % project.images.length
      }));
    }, 2800); // Change image every 2.8 seconds

    return () => clearInterval(interval);
  }, [selectedProject]);

  return (
    <section id="work" className="py-24 px-6 relative">
      <DecorativeBackground variant="minimal" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4">Selected Work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of projects where design meets purpose
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setSelectedProject(project.id)}
              onMouseLeave={() => setSelectedProject(null)}
              className="group cursor-pointer"
            >
              <a href={`#project-${project.id}`} className="block">
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-muted mb-6 aspect-[4/3]"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={project.images[currentImageIndexes[project.id] || 0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: selectedProject === project.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Adaptive Blur for Text Readability */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/40 to-transparent backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Image Progress Indicators */}
                  {selectedProject === project.id && project.images.length > 1 && (
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {project.images.map((_, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className="h-1 bg-background/30 rounded-full overflow-hidden"
                          style={{ width: '24px' }}
                        >
                          <motion.div
                            className="h-full bg-background"
                            initial={{ width: '0%' }}
                            animate={{
                              width: (currentImageIndexes[project.id] || 0) === imgIndex ? '100%' : '0%'
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Text Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: selectedProject === project.id ? 1 : 0,
                      y: selectedProject === project.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-background">
                      <p className="text-sm mb-2 opacity-90">{project.category} • {project.year}</p>
                      <h4 className="text-xl mb-2">{project.title}</h4>
                      <p className="text-sm opacity-90">{project.description}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 shadow-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{project.category}</span>
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-2xl tracking-tight flex items-center gap-2 group-hover:text-accent transition-colors">
                    {project.title}
                    <motion.div
                      animate={{
                        x: selectedProject === project.id ? 4 : 0,
                        y: selectedProject === project.id ? -4 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </motion.div>
                  </h3>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}