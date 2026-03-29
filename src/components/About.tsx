import { motion } from "motion/react";
import { DecorativeBackground } from "./DecorativeBackground";
import { Download } from "lucide-react";
import { useState } from "react";

export function About() {
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    // Replace with actual resume URL
    const resumeUrl = "https://drive.google.com/file/d/1rJE98giicK83EJ24HOqLES3X7kgV2dcG/view?usp=drive_link";
    const link = document.createElement("a");
    link.href = "https://drive.google.com/file/d/1rJE98giicK83EJ24HOqLES3X7kgV2dcG/view?usp=drive_link";
    link.download = "Obinna_Anyanwu_Resume.pdf";
    link.click();
    
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  return (
    <section id="about" className="py-24 px-6 relative">
      <DecorativeBackground variant="subtle" />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h2
                className="text-3xl md:text-5xl tracking-tight mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About
              </motion.h2>
              <motion.div
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p>
                  I'm a UI/UX Designer with 4 years of experience crafting inclusive and impactful
                  user experiences. I specialize in product design, UX research, branding, and
                  interaction design, with a strong track record in fintech, SaaS, healthcare,
                  and e-commerce.
                </p>
                <p>
                  My approach centers on pinpointing and resolving user experience challenges to
                  enhance product usability. I design with a human-centered, goal-oriented mindset
                  to create meaningful solutions that strike the right balance between stakeholder
                  business goals and user needs.
                </p>
                <p>
                  I believe in developing and maintaining realistic, strategic roadmaps to guide
                  product growth, ensuring every design decision is purposeful and impactful.
                </p>
              </motion.div>
            </div>

            <div className="space-y-8 lg:pt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="mb-4 text-foreground relative inline-block">
                  Focus Areas
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
                </h4>
                <div className="space-y-3 text-muted-foreground">
                  <p>Product Design</p>
                  <p>UX Research</p>
                  <p>Branding</p>
                  <p>Interaction Design</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4 className="mb-4 text-foreground relative inline-block">
                  Industries
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
                </h4>
                <div className="space-y-3 text-muted-foreground">
                  <p>Fintech</p>
                  <p>SaaS</p>
                  <p>Healthcare</p>
                  <p>E-commerce</p>
                  <p>Web 3</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h4 className="mb-4 text-foreground relative inline-block">
                  Certifications
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-accent"></span>
                </h4>
                <div className="space-y-3 text-muted-foreground">
                  <p>Figma for UI/UX Master Web Design</p>
                  <p>Complete Web & Mobile Design Course</p>
                </div>
              </motion.div>

              {/* Resume Download */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="group relative w-full lg:w-auto px-5 md:px-6 py-3.5 md:py-4 bg-accent md:bg-accent/10 md:hover:bg-accent text-accent-foreground md:text-muted-foreground md:hover:text-accent-foreground rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 md:gap-3 overflow-hidden touch-manipulation text-sm md:text-base shadow-lg shadow-accent/20 md:shadow-none"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px -5px rgba(249, 115, 22, 0.2)",
                      "0 10px 30px -5px rgba(249, 115, 22, 0.35)",
                      "0 10px 25px -5px rgba(249, 115, 22, 0.2)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent hidden md:block"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5
                    }}
                    className="md:animate-none"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5 relative z-10 flex-shrink-0" />
                  </motion.div>
                  <span className="relative z-10 whitespace-nowrap">
                    {isDownloaded ? "Downloaded!" : "Download Resume"}
                  </span>
                  {isDownloaded && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="relative z-10"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}