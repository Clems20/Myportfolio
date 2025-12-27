import { motion } from "motion/react";
import { DecorativeBackground } from "./DecorativeBackground";

export function About() {
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
                  I'm a UI/UX Designer with 3 years of experience crafting inclusive and impactful
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}