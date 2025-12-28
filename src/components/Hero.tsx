import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isViewWorkHovered, setIsViewWorkHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-secondary/50 blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent/5"
        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-muted-foreground mb-6 inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            UI/UX Designer — Lagos, Nigeria
          </motion.p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-8 text-foreground">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              I design things people
            </motion.span>
            <br />
            <motion.span
              className="inline-block relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              actually enjoy using
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-accent/20 -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                style={{ originX: 0 }}
              />
            </motion.span>
          </h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            With 3 years of crafting inclusive and impactful experiences across fintech,
            SaaS, healthcare, and e-commerce.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#work"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full transition-all inline-block group"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsViewWorkHovered(true)}
            onMouseLeave={() => setIsViewWorkHovered(false)}
            style={{
              boxShadow: isViewWorkHovered 
                ? '0 10px 25px -5px rgba(249, 115, 22, 0.3), 0 8px 10px -6px rgba(249, 115, 22, 0.2)' 
                : '0 0 0 0 rgba(249, 115, 22, 0)',
            }}
          >
            <span className="flex items-center gap-2">
              <motion.span
                key={isViewWorkHovered ? 'explore' : 'work'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isViewWorkHovered ? "Let's Explore" : "View Work"}
              </motion.span>
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: isViewWorkHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-border rounded-full hover:border-accent hover:text-accent transition-all inline-block"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsContactHovered(true)}
            onMouseLeave={() => setIsContactHovered(false)}
            style={{
              boxShadow: isContactHovered 
                ? '0 10px 25px -5px rgba(249, 115, 22, 0.2), 0 8px 10px -6px rgba(249, 115, 22, 0.15)' 
                : '0 0 0 0 rgba(249, 115, 22, 0)',
            }}
          >
            <motion.span
              key={isContactHovered ? 'hello' : 'talk'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isContactHovered ? "Say Hello" : "Let's Talk"}
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block text-muted-foreground"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}