import { motion } from "motion/react";

interface CaseStudyProps {
  id: string;
  title: string;
  category: string;
  year: string;
  problem: string;
  process: string[];
  solution: string;
  impact: string[];
  image: string;
}

export function CaseStudy({
  id,
  title,
  category,
  year,
  problem,
  process,
  solution,
  impact,
  image
}: CaseStudyProps) {
  return (
    <section id={id} className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span>{category}</span>
            <span>•</span>
            <span>{year}</span>
          </div>
          <h2 className="text-4xl md:text-6xl tracking-tight">{title}</h2>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 rounded-2xl overflow-hidden bg-muted aspect-video"
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h3 className="text-2xl mb-6">Problem</h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {problem}
          </p>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h3 className="text-2xl mb-6">Process</h3>
          <div className="space-y-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed pt-0.5">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h3 className="text-2xl mb-6">Solution</h3>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {solution}
          </p>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl mb-6">Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impact.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-secondary rounded-2xl"
              >
                <p className="text-muted-foreground leading-relaxed">{metric}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
