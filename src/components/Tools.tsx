import { motion } from "motion/react";

const toolCategories = [
  {
    category: "Wireframing",
    tools: ["Figma", "Balsamiq Mockups", "Uizard"]
  },
  {
    category: "Userflows + Mind Map",
    tools: ["Miro", "LucidDraw"]
  },
  {
    category: "UI Design",
    tools: ["Figma", "Adobe XD", "Sketch", "Invision"]
  },
  {
    category: "Handoff",
    tools: ["Zeplin"]
  },
  {
    category: "Prototyping",
    tools: ["Protopie", "Principle", "Figma", "Adobe XD"]
  },
  {
    category: "Product Management",
    tools: ["Click Up", "Notion", "Miro", "Linear"]
  }
];

export function Tools() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4 md:mb-6">Tools</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Various tools that help with my design process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {toolCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-5 md:p-6 bg-card border border-border rounded-xl md:rounded-2xl hover:border-accent/50 transition-all group space-y-3 md:space-y-4"
            >
              <h3 className="text-foreground text-base md:text-lg">{category.category}</h3>
              <ul className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <motion.li 
                    key={toolIndex} 
                    className="text-sm md:text-base text-muted-foreground flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + toolIndex * 0.05 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    {tool}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}