import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { DecorativeBackground } from "./DecorativeBackground";

export const projects = [
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
    description: "Redesigning a complex dashboard to help users understand their finances at a glance",
    client: "FinanceFlow",
    role: "Lead Product Designer",
    date: "Jan - Mar 2024",
    productLink: "https://financeflow.example.com",
    tools: ["Figma", "Figjam", "Protopie"],
    goal: "Create an intuitive dashboard that simplifies complex financial data for everyday users",
    problem: "Users were overwhelmed by data-heavy interfaces and struggled to find actionable insights",
    userDescription: "Busy professionals aged 25-45 who want to manage finances without becoming financial experts",
    challenges: [
      "Balancing data density with visual clarity without losing important information",
      "Designing for both novice and power users with different needs and expectations",
      "Creating a scalable design system that works across web and mobile platforms"
    ],
    processSteps: [
      {
        title: "Discovery & Research",
        description: "Conducted user interviews with 15 users and analyzed existing usage patterns to understand pain points and opportunities.",
        images: [
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes & Information Architecture",
        description: "Mapped out user flows and created low-fidelity wireframes to test different layouts and information hierarchies.",
        images: [
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Visual Design & Prototyping",
        description: "Developed high-fidelity designs with a focus on scannable data visualization and clear CTAs. Created interactive prototypes for testing.",
        images: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      }
    ],
    results: {
      metrics: [
        "40% reduction in time to complete key tasks",
        "85% user satisfaction score in post-launch surveys",
        "60% increase in daily active users within first month"
      ],
      learnings: [
        "Progressive disclosure is crucial for managing complexity without overwhelming users",
        "Small animations and micro-interactions significantly improve perceived performance",
        "Regular user testing throughout the design process prevented major pivots later"
      ]
    }
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
    description: "Building a unified workspace that brings teams together without the complexity",
    client: "WorkHub",
    role: "UX Strategist & Product Designer",
    date: "Apr - Aug 2024",
    tools: ["Figma", "Miro", "Notion"],
    goal: "Design a collaboration platform that reduces tool fragmentation and improves team productivity",
    problem: "Teams were using 5+ disconnected tools, leading to context switching and lost information",
    userDescription: "Remote and hybrid teams of 10-50 people across creative and tech industries",
    challenges: [
      "Integrating multiple tool functionalities without creating a cluttered experience",
      "Designing for both synchronous and asynchronous collaboration patterns",
      "Ensuring the platform remained fast and responsive despite rich features"
    ],
    processSteps: [
      {
        title: "Competitive Analysis & User Research",
        description: "Analyzed 12 collaboration tools and interviewed 25 team leads to understand workflow patterns and pain points.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Journey Mapping & Feature Prioritization",
        description: "Created detailed journey maps for different user personas and prioritized features based on impact vs effort.",
        images: [
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Design System & UI Development",
        description: "Built a comprehensive design system focused on consistency and flexibility. Designed modular components for different workspace views.",
        images: [
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      }
    ],
    results: {
      metrics: [
        "Teams reduced tool usage from average 5.3 to 2.1 tools",
        "73% of users reported improved team communication",
        "90-day retention rate of 82% after launch"
      ],
      learnings: [
        "Successful adoption requires gradual migration, not abrupt tool replacement",
        "Customizable workspaces are essential for different team cultures",
        "Real-time collaboration features need careful performance optimization"
      ]
    }
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
    description: "Making banking feel less like a chore and more like a helpful companion",
    client: "NextGen Bank",
    role: "Senior Mobile Designer",
    date: "Sep - Dec 2023",
    tools: ["Figma", "Principle", "Maze"],
    goal: "Create a mobile banking experience that resonates with Gen Z users and builds healthy financial habits",
    problem: "Traditional banking apps felt intimidating and disconnected from how young users think about money",
    userDescription: "Gen Z users (18-25) looking for their first independent banking experience",
    challenges: [
      "Building trust and security perception without feeling corporate or stuffy",
      "Gamifying financial literacy without trivializing serious money matters",
      "Designing for accessibility while maintaining a fresh, youthful aesthetic"
    ],
    processSteps: [
      {
        title: "Gen Z User Research",
        description: "Conducted contextual inquiries and diary studies with 20 Gen Z users to understand their relationship with money and existing banking frustrations.",
        images: [
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Concept Testing & Iteration",
        description: "Created multiple design concepts focusing on personality, clarity, and delight. Tested with users to find the right balance.",
        images: [
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Final Design & Motion",
        description: "Developed polished UI with thoughtful micro-interactions and a friendly tone of voice. Created detailed motion specs for development.",
        images: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      }
    ],
    results: {
      metrics: [
        "15K+ downloads in first two weeks of launch",
        "4.7 star rating on App Store",
        "Users check app 3.2x more than competitor apps"
      ],
      learnings: [
        "Conversational UI and friendly copy dramatically improved user comfort",
        "Visual feedback for every action built confidence in first-time users",
        "Educational content works best when integrated naturally into the experience"
      ]
    }
  }
];

export function WorkGrid({ onProjectClick }: { onProjectClick?: (projectId: number) => void }) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll images - on mobile: all projects cycle, on desktop: only hovered project
  useEffect(() => {
    if (isMobile) {
      // On mobile, cycle all project images
      const intervals = projects.map(project => {
        if (project.images.length <= 1) return null;
        
        return setInterval(() => {
          setCurrentImageIndexes(prev => ({
            ...prev,
            [project.id]: ((prev[project.id] || 0) + 1) % project.images.length
          }));
        }, 4000); // Change image every 4 seconds on mobile
      });

      return () => {
        intervals.forEach(interval => {
          if (interval) clearInterval(interval);
        });
      };
    } else {
      // On desktop, only cycle the hovered project
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
      }, 2800); // Change image every 2.8 seconds on desktop hover

      return () => clearInterval(interval);
    }
  }, [selectedProject, isMobile]);

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
              <div
                className="block"
                onClick={(e) => {
                  e.preventDefault();
                  onProjectClick?.(project.id);
                }}
              >
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
                  
                  {/* Gradient Overlay - Always visible on mobile, hover on desktop */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent"
                    initial={{ opacity: isMobile ? 1 : 0 }}
                    animate={{ opacity: (isMobile || selectedProject === project.id) ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Adaptive Blur for Text Readability - Always visible on mobile */}
                  <motion.div 
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/40 to-transparent backdrop-blur-md"
                    initial={{ opacity: isMobile ? 1 : 0 }}
                    animate={{ opacity: (isMobile || selectedProject === project.id) ? 1 : 0 }}
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
                  
                  {/* Text Overlay - Always visible on mobile, hover on desktop */}
                  <motion.div
                    className="absolute inset-0 flex items-end p-6"
                    initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                    animate={{ 
                      opacity: (isMobile || selectedProject === project.id) ? 1 : 0,
                      y: (isMobile || selectedProject === project.id) ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-background relative z-10">
                      {/* Hide category and year on mobile */}
                      {!isMobile && (
                        <p className="text-sm mb-2 opacity-90">{project.category} • {project.year}</p>
                      )}
                      <h4 className={`${isMobile ? 'text-lg mb-1.5' : 'text-xl mb-2'}`}>{project.title}</h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} opacity-90 line-clamp-2`}>{project.description}</p>
                    </div>
                  </motion.div>
                  
                  {/* Shadow */}
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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}