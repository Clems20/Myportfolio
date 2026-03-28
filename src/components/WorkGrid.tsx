import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { DecorativeBackground } from "./DecorativeBackground";


export const projects = [
  {
    id: 1,
    title: "Delorand E-commerce Website ",
    category: "Product Design",
    year: "2022-2026",
    images: [
      "/delorand/cover.webp",
    ],
    description: "Designing the e-commerce experience to seamlessly blend premium fashion shopping with engaging social features.",
    client: "Delorand",
    role: "Lead Product Designer",
    date: "Dec 2022 - 2026",
    productLink: "https://delorand.com",
    tools: ["Figma", "Figjam", "Protopie"],
    goal: "To playfully disrupt traditional ecommerce by building a seamlessly connected social shopping experience.",
    problem: "Online shopping feels completely isolated, so we built a vibrant space where fashion and community seamlessly collide.",
    userDescription: "I effortlessly led the end to end design of a vibrant social fashion platform, blending smart architecture with gorgeous visuals to boost user engagement by a massive 50 percent.",
    challenges: [
      "Balancing data density with visual clarity without losing important information",
      "Designing for both novice and power users with different needs and expectations",
      "Creating a scalable design system that works across web and mobile platforms",
      "To design an immersive,dark mode social feed that effortlessly turns casual scrolling and community interaction into instant fashion purchases."
    ],
    processSteps: [
      {
        title: "User Research",
        description: "Conducted user interviews with 15 users and analyzed existing usage patterns to understand pain points during online shopping and apped the exact psychological triggers that drive social shopping.",
        images: [
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes and Concept Testing",
        description: "Mapped out user flows and created low-fidelity wireframes to test different layouts and information hierarchies.",
        images: [
          "/delorand/styleguide.webp"
        ]
      },
      {
        title: "Final Design",
        description: "Developed high-fidelity dark mode designs with a focus on highlighting vibrant fashion imagery and clear, intuitive social interactions (like,follow). Created interactive prototypes for testing.",
        images: [
    "/delorand/landingpages.webp",
    "/delorand/storepage.webp",
    "/delorand/productpage.webp",
    "/delorand/dropdown.webp",
    "/delorand/cart.webp",
    "/delorand/cartplus.webp",
    "/delorand/cartplus2.webp",
    "/delorand/accountanddetails.webp",
    "/delorand/helpandcontact.webp",
    

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
        "Regular user testing of the hybrid features throughout the design process prevented major pivots later.",
        "Blending familiar social gestures with commerce requires strict visual hierarchy to avoid confusing the user.",

        
      ]
    }
  },
    {
    id: 2,
    title: "Fima",
    category: "UI UX / Product Design",
    year: "2025-2026",
    images: [
      "/fimacasestudy/cover.webp",
      "/fimacasestudy/cover2.webp"
      
    ],
    description: "Designed a user-friendly utility app that enables users to buy data, airtime, electricity, and cable subscriptions seamlessly",
    client: "Fima",
    role: "Lead UI/UX & Product Designer",
    date: "Feb - Aug 2025",
    productLink: "https://fima.delorand.com/",
    tools: ["Figma",  "Notion"],
    goal: "Streamline Daily and Recurring Payments to provide users with a fast, simple, and reliable way to buy data, airtime, electricity, and cable subscriptions in one place.",
    problem: "Existing apps were dense and overwhelming, cluttered, ad‑heavy, or confusing, causing errors and failed transactions",
    userDescription: "Busy smartphone users who need a fast, reliable way to handle all their utility payments in one place.",
    challenges: [
      "Create a user-friendly interface for managing personal finances.",
      "Offer secure and convenient methods for making transaction and payment.",
      "Streamline Daily and Recurring Payments to provide users with a fast, simple, and reliable way to buy data, airtime, electricity, and cable subscriptions in one place.",
      "onboarding uusers to a new financial app while building trust and confidence in the security of thier transactions.",
      "Ensure Transaction Security to integrate secure payment gateways and data protection measures that build user trust and safeguard personal information."
    ],
    processSteps: [
      {
        title: "User Research",
        description: "I started by interviewing and surveying users who regularly buy airtime, data, and tokens for themselves, family, and customers. I asked them to walk me through their current process and to share where things usually go wrong. I also analyzed app store reviews of existing utility payment apps to identify common pain points and feature requests.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Case Study",
        description: "",
        images: [
    "/fimacasestudy/Project Title.webp",
    "/fimacasestudy/Project overview.webp",
    "/fimacasestudy/Style Guide.webp"
],
      },
      {
        title: "Final Design",
        description: "I developed high fidelity designs focused on scannable data visualization and clear calls to action. The interface uses a dark theme with accent colors to highlight important trends and CTAs while maintaining visual balance. Interactive prototypes helped validate flows like switching time ranges, drilling into metrics, and initiating key financial actions.",
        images: [
    "/fimacasestudy/Home Screen.webp",
    "/fimacasestudy/Login and Sign up screens.webp",
    "/fimacasestudy/Transfer Money.webp",
    "/fimacasestudy/more service.webp",
    "/fimacasestudy/Others Screena.webp",
    "/fimacasestudy/Others Screena-1.webp",
    "/fimacasestudy/web.webp"
        ]
      }
    ],
    results: {
      metrics: [
        "Faster completion time for repeat payments compared to their previous apps",
        "Fewer user errors during electricity and TV flows due to better validation and confirmation steps.",
        "Higher perceived trust thanks to clear summaries, visible history, and transparent status messages."
      ],
      learnings: [
        "Progressive disclosure is crucial when handling complex details on small screens; showing everything at once overwhelms users.",
        "Small animations and micro‑interactions can make a huge difference in perceived speed and reliability, especially around payment actions.",
        "Regular user testing throughout the design process catches confusing steps early and avoids costly redesigns later.",
        "Visual feedback for every action built confidence in first-time users"
      ]
    }
  },
  {
    id: 3,
    title: "GMC: Web3 Agricultural NFT & Reward Platform",
    category: "UI UX / Product Design",
    year: "2025",
    images: [
      "/gmc/cover.webp",
    ],
    description: "GMC is a responsive web platform that helps people invest in agriculture using crypto assets, track returns, and support community‑based farm projects. ",
    client: "Freelance",
    role: "UI/UX & Product Designer",
    date: "May 2024",
    productLink: "https://www.figma.com/design/7K6NCVY2wTThf5QdPCJ0O5/WEB-3-Agric?node-id=0-1&t=Ie95aLVYxJ4GsQyY-1",
    tools: ["Figma",  "Notion"],
    goal: "GMC bridges this gap by packaging farm projects into clear investment plans, allowing users to fund them with supported crypto assets and monitor performance in real time.",
    problem: "Users needed to understand quickly that GMC combines agriculture, high‑yield plans, and crypto funding—without being overwhelmed by jargon.",
    userDescription: "Crypto‑curious young professionals who want simple, high‑yield agricultural investments and an easy way to track ROI online.",
    challenges: [
      "Clearly communicate what GMC is and why agricultural investments can be attractive, directly from the homepage hero.",
      "Design a simple account‑creation and login flow with options for social sign‑in and wallet connection.",
      "Make it easy to compare investment models and create a personalized plan with clear minimums, benefits, and risks.",
      "Provide an investor dashboard that presents core metrics (capital, monthly ROI, yearly ROI, total profit, withdrawal date) in a scannable layout.",
      "Highlight community projects and impact stories so users see where their money goes beyond the numbers."
    ],
    processSteps: [
      {
        title: "User Research",
        description: "I started by mapping two primary user types: Return‑focused investors interested in yield, duration, and supported crypto assets and Impact‑driven supporters who care about sustainability, farmer livelihoods, and community projects.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes and Concept Testing",
        description: "The visual direction is grounded, modern, and investment‑ready: warm neutrals with green accents, clean typography, and a balance of data and imagery. I created wireframes and prototypes to test the information hierarchy and flow of key tasks like comparing investment plans, creating a personalized plan, and monitoring the investor dashboard.",
        images: [
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Final Design",
        description: "I developed high fidelity designs focused on scannable data visualization and clear calls to action. The interface uses a dark theme with accent colors to highlight important trends and CTAs while maintaining visual balance. Interactive prototypes helped validate flows like switching time ranges, drilling into metrics, and initiating key financial actions.",
        images: [
    "/gmc/homepage.webp",
    "/gmc/about.webp",
    "/gmc/community.webp",
    "/gmc/login.webp",
    "/gmc/dashboard.webp",
    "/gmc/investment1.webp",
    "/gmc/createplan.webp",
    "/gmc/creates.webp"
        ]
      }
    ],
    results: {
     
      learnings: [
        "Breaking complex propositions into separate pages (Investment Details vs. Community Impact) helps users digest information step by step.",
        "Combining photography with a restrained, consistent design system creates a strong sense of legitimacy.",
        "Clear investment models plus a customizable plan gives both beginners and advanced users the control they expect from a financial platform."
        
      ]
    }
  },
  {
    id: 4,
    title: "BJT Wedding Website",
    category: "UI UX / Product Design",
    year: "2025",
    images: [
      "/bjt/cover.webp"
    ],
    description: "This project is a custom wedding website created for a couple who wanted a single, beautiful space to tell their story, host a live stream, and manage RSVPs and gifts online. ",
    client: "Freelance",
    role: "UI/UX & Product Designer",
    date: "May 2024",
    productLink: "https://bjtofficial.com/",
    tools: ["Figma",  "Notion", "Google Meet"],
    goal: "The couple wanted something more intimate than a generic template: a site that felt like an extension of their personalities, with a romantic, purple‑themed visual language, while still being practical for guests of all ages.",
    problem: "Representing the couple’s story visually and in copy, without letting the site feel cluttered or overly sentimental.",
    userDescription: "Friends and family of the couple (all ages) who need an easy place to read the love story, get event details, RSVP, and watch the live stream on any device.",
    challenges: [
      "Create a romantic yet modern visual identity built around deep purple tones, floral ornaments, and elegant typography.",
      "Design a single‑page layout where guests can smoothly scroll from story to details to RSVP without getting lost.",
      "Make the live stream section and RSVP form highly visible so remote guests can easily join and respond.",
      "Provide clear gift and bank details in a respectful, non‑pushy way."
      
    ],
    processSteps: [
      {
        title: "User Research",
        description: "To understand what guests needed from the wedding website, I spoke with a small group of friends and family across different age ranges and tech comfort levels. I also reviewed common best practices for wedding websites and RSVP tools to see what information guests expect online—such as clear event details, RSVP forms, and gift information in one place.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes and Concept Testing",
        description: "The visual direction is grounded, modern, and investment‑ready: warm neutrals with green accents, clean typography, and a balance of data and imagery. I created wireframes and prototypes to test the information hierarchy and flow of key tasks like comparing investment plans, creating a personalized plan, and monitoring the investor dashboard.",
        images: [
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Final Design",
        description: "The final wedding website is a single, long‑scroll experience that guides guests from emotion to action in a clear, linear flow. A warm purple palette, floral ornaments, and intimate photography create a romantic atmosphere while maintaining strong contrast and readability.",
        images: [
          "/bjt/web.webp",
          "/bjt/mobile.webp"
        ]
      }
    ],
    results: {
     
      learnings: [
        "A single, well‑structured scroll page can handle complex wedding content if sections are clearly labeled and visually separated.",
        "Small details like a countdown timer, inline love notes, and a quick “copy account” button—add emotional impact and convenience at the same time.",
        "Designing mobile and desktop side by side early helps ensure that no section becomes unusable on small screens."
        
      ]
    }
  },
    {
    id: 5,
    title: "Web3 Agricultural NFT & Reward Platform",
    category: "UI UX / Product Design",
    year: "2025",
    images: [
      "/agrinft/cover.webp"
    ],
    description: "Merging the deeply grounded world of agriculture with the limitless potential of Web3 and digital collectibles. ",
    client: "Freelance",
    role: "UI/UX & Product Designer",
    date: "August 2024",
    productLink: "https://www.figma.com/design/sgrkgja383VfsViWF6YlCq/NFT-MINT-WEBSITE?node-id=0-1&t=25yQQAEMXAnPI6rK-1",
    tools: ["Figma",  "Notion", "Google Meet"],
    goal: "To brilliantly merge traditional agriculture with Web3 innovation by building a seamlessly rewarding NFT ecosystem.",
    problem: "Agricultural platforms often feel incredibly traditional and disconnected, so we built a vibrant blockchain space where farming milestones directly translate to gorgeous digital rewards.",
    userDescription: "Friends and family of the couple (all ages) and Web3 enthusiasts.",
    challenges: [
      "Balancing dense crypto data with striking visual clarity without losing any important transaction details.",
      "Designing an irresistible onboarding flow for both Web3 novices and experienced NFT collectors with completely different needs.",
      "Creating a beautiful, highly scalable design system that bridges the gap between digital assets and real world agriculture.",
      "Crafting an immersive dashboard that effortlessly turns farming investments into instantly rewarding digital collectibles."
      
    ],
    processSteps: [
      {
        title: "User Research",
        description: "Conducted deep user interviews with 15 users and analyzed existing Web3 platforms to completely understand the exact friction points in crypto onboarding. We perfectly mapped the psychological triggers that make digital rewards feel incredibly satisfying and totally secure.",
        images: [
          "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes and Concept Testing",
        description: "Mapped out remarkably smooth user flows and created low fidelity wireframes to playfully test entirely new layouts. The main focus was making sure the usually clunky wallet connection process felt perfectly natural and completely effortless.",
        images: [
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Final Design",
        description: "Developed gorgeous high fidelity designs with a deep focus on scannable data visualization and irresistible interactive elements.",
        images: [
          "/agrinft/getstarted.webp",
    "/agrinft/homepage.webp",
    "/agrinft/mintnft.webp",
        ]
      }
    ],
    results: {
     
      learnings: [
        "A single, well‑structured scroll page can handle complex wedding content if sections are clearly labeled and visually separated.",
        "Small details like a countdown timer, inline love notes, and a quick “copy account” button—add emotional impact and convenience at the same time.",
        "Designing mobile and desktop side by side early helps ensure that no section becomes unusable on small screens."
        
      ]
    }
  },
  {
    id: 6,
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
        title: "User Research",
        description: "Conducted contextual inquiries and diary studies with 20 Gen Z users to understand their relationship with money and existing banking frustrations.",
        images: [
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Wireframes and Concept Testing",
        description: "Created multiple design concepts focusing on personality, clarity, and delight. Tested with users to find the right balance.",
        images: [
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        ]
      },
      {
        title: "Final Design",
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