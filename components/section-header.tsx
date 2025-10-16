"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
}

export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="text-center flex flex-col gap-2 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="relative inline-block mx-auto"
      >
        <motion.span
          className="text-sm font-medium relative inline-block"
          initial={{ backgroundPositionX: "0%" }}
          animate={{ backgroundPositionX: "200%" }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--primary) 0%, #ffffff 10%, var(--primary) 20%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {label}
        </motion.span>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl mb-2"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="text-center text-sm font-medium tracking-tight md:text-sm lg:text-base text-muted-foreground mx-auto max-w-lg"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
