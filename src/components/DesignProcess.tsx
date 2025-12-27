import { motion } from "motion/react";
import { Search, Lightbulb, Pencil, TestTube, RefreshCw, FileText } from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "Define the Problem & Conduct Research",
    description: "Understanding user needs and business requirements through research and analysis"
  },
  {
    icon: Lightbulb,
    title: "Ideation & Concept Development",
    description: "Exploring creative solutions and developing design concepts"
  },
  {
    icon: Pencil,
    title: "Sketching & Prototyping",
    description: "Creating wireframes and interactive prototypes to visualize ideas"
  },
  {
    icon: TestTube,
    title: "Testing & Evaluation",
    description: "Validating designs with users and gathering feedback"
  },
  {
    icon: RefreshCw,
    title: "Refinement & Iteration",
    description: "Improving designs based on insights and user feedback"
  },
  {
    icon: FileText,
    title: "Final Design & Documentation",
    description: "Delivering polished designs with comprehensive documentation"
  }
];

export function DesignProcess() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">Design Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            While my design process is tailored to fit the specific needs and scope of each 
            project, it typically follows this overarching framework
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-8 bg-card border border-border rounded-2xl hover:border-accent hover:shadow-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}