import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isViewWorkHovered, setIsViewWorkHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 relative overflow-hidden">
      {/* Animated Background Blobs - Theme Aware */}
      
      {/* Blob 1 - Top Left - Accent Glow */}
      <motion.div
        className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.12) 0%, hsl(24 95% 53% / 0.04) 50%, transparent 100%)',
          filter: 'blur(40px)',
          top: '-5%',
          left: '-8%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 - Top Right - Secondary Soft */}
      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full"
        style={{
          background: 'var(--color-secondary)',
          opacity: 0.3,
          filter: 'blur(50px)',
          top: '8%',
          right: '-10%',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Blob 3 - Middle Left - Muted Organic */}
      <motion.div
        className="absolute w-[220px] h-[220px] md:w-[420px] md:h-[420px]"
        style={{
          background: 'var(--color-muted)',
          opacity: 0.25,
          filter: 'blur(45px)',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          top: '35%',
          left: '2%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -60, 0],
          rotate: [0, 90, 0],
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '40% 60% 70% 30% / 40% 70% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blob 4 - Bottom Right - Accent Mix */}
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px]"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.08) 0%, var(--color-secondary) 60%, transparent 100%)',
          opacity: 0.35,
          filter: 'blur(55px)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          bottom: '-10%',
          right: '5%',
        }}
        animate={{
          x: [0, -70, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
          borderRadius: [
            '30% 70% 70% 30% / 30% 30% 70% 70%',
            '70% 30% 30% 70% / 70% 70% 30% 30%',
            '30% 70% 70% 30% / 30% 30% 70% 70%',
          ],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Blob 5 - Center Floating - Subtle Accent */}
      <motion.div
        className="absolute w-[180px] h-[180px] md:w-[320px] md:h-[320px]"
        style={{
          background: 'radial-gradient(circle, hsl(24 95% 53% / 0.1) 0%, transparent 70%)',
          filter: 'blur(35px)',
          borderRadius: '40% 60% 50% 50% / 60% 40% 60% 40%',
          top: '45%',
          right: '15%',
        }}
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 40, 0],
          rotate: [0, 180, 360],
          borderRadius: [
            '40% 60% 50% 50% / 60% 40% 60% 40%',
            '60% 40% 60% 40% / 40% 60% 40% 60%',
            '50% 50% 40% 60% / 50% 50% 60% 40%',
            '40% 60% 50% 50% / 60% 40% 60% 40%',
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Blob 6 - Bottom Left - Muted Blend */}
      <motion.div
        className="absolute w-[160px] h-[160px] md:w-[280px] md:h-[280px]"
        style={{
          background: 'var(--color-secondary)',
          opacity: 0.4,
          filter: 'blur(40px)',
          borderRadius: '70% 30% 50% 50% / 30% 70% 30% 70%',
          bottom: '18%',
          left: '8%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
          borderRadius: [
            '70% 30% 50% 50% / 30% 70% 30% 70%',
            '30% 70% 30% 70% / 70% 30% 70% 30%',
            '70% 30% 50% 50% / 30% 70% 30% 70%',
          ],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
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
            With 4 years of crafting inclusive and impactful experiences across fintech,
            SaaS, healthcare, e-commerce, and Web 3.
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