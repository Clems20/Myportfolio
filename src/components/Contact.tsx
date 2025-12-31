import { motion } from "motion/react";
import { Mail, Linkedin } from "lucide-react";

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

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
          <h2 className="text-3xl md:text-5xl tracking-tight mb-6">Are you ready to create something extraordinary together?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Reach out to me via any of my contacts below
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
              {
                href: "https://wa.me/+2348181803808",
                icon: WhatsAppIcon,
                label: "WhatsApp",
                rotation: 0,
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
                {social.icon === XIcon || social.icon === WhatsAppIcon ? <social.icon /> : <social.icon className="w-6 h-6" />}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}