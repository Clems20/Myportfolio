import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          © {new Date().getFullYear()} Obinna Anyanwu. All rights reserved.
        </motion.p>
        <motion.div
          className="flex items-center gap-6 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { href: "#work", label: "Work" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ].map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-accent"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}