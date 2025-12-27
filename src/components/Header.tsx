import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { id: "home", label: "Home", href: "#" },
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = sectionId === "home" 
          ? document.querySelector("body") 
          : document.getElementById(sectionId);
        
        if (element) {
          const offsetTop = sectionId === "home" ? 0 : element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-foreground hover:text-accent transition-colors relative group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative">
            Obinna Anyanwu
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-accent"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navItems.slice(0, 3).map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              className={`relative transition-colors ${
                activeSection === item.id ? 'text-foreground' : 'text-muted-foreground'
              } hover:text-foreground`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                className={`relative transition-colors py-2 pl-4 ${
                  activeSection === item.id ? 'text-foreground' : 'text-muted-foreground'
                } hover:text-accent`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="mobileActiveIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}