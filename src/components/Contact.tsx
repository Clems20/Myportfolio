import { motion } from "motion/react";
import { Mail, Linkedin, Phone } from "lucide-react";

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">Let's work together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Ready for the design challenge? Have a project to discuss? Reach out to me via 
            any of my contacts below.
          </p>

          <div className="flex flex-col items-center gap-4 mb-12">
            <motion.a
              href="mailto:anyanwuclems@gmail.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-all group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              anyanwuclems@gmail.com
              <motion.span
                className="ml-1"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </motion.a>

            <motion.a
              href="tel:+2349161843188"
              className="inline-flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <Phone className="w-5 h-5" />
              +234 916 184 3188
            </motion.a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8 border-t border-border">
            {[
              {
                href: "http://www.linkedin.com/in/obinna-anyanwu-19994b274",
                icon: Linkedin,
                label: "LinkedIn",
                rotation: 5,
              },
              {
                href: "https://x.com/Obinna226",
                icon: XIcon,
                label: "X (Twitter)",
                rotation: -5,
              },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-accent transition-colors rounded-full hover:bg-accent/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: social.rotation }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                {social.icon === XIcon ? <XIcon /> : <social.icon className="w-6 h-6" />}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}