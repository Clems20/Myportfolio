import { motion } from "motion/react";

interface DecorativeBackgroundProps {
  variant?: "default" | "subtle" | "minimal";
}

export function DecorativeBackground({ variant = "default" }: DecorativeBackgroundProps) {
  if (variant === "minimal") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-secondary/60 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-accent/10 blur-3xl"
          style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
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
        className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-secondary/50 blur-3xl"
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
        className="absolute top-1/2 left-1/3 w-28 h-28 bg-accent/5"
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
    </div>
  );
}
