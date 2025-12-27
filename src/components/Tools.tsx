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
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">Tools</h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Various tools that help with my design process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-foreground">{category.category}</h3>
              <ul className="space-y-2">
                {category.tools.map((tool, toolIndex) => (
                  <li key={toolIndex} className="text-muted-foreground">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
