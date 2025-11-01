"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="h-screen">
      <div className="relative w-full h-full overflow-hidden">
        {/* Vimeo Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto"
            style={{ width: "177.77vh", height: "56.25vw" }}
          >
            <iframe
              src="https://player.vimeo.com/video/1132779126?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
              className="absolute top-0 left-0 w-full h-full bg-black! scheme-normal!"
              style={{ border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold text-primary text-center mb-6 tracking-tight"
          >
            Watts Up Media
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative text-lg md:text-xl lg:text-2xl text-white/80 text-center font-light leading-relaxed max-w-2xl mb-10"
          >
            Bringing your vision to life
            <svg
              className="absolute -bottom-3 left-0 w-full"
              viewBox="0 0 200 20"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M5,12 Q25,5 45,10 T85,12 Q125,8 165,11 T195,10"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="opacity-70 animate-drawLine"
              />
            </svg>
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="flex gap-4 max-md:flex-col"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full"
              onClick={() => {
                window.open(
                  "https://listings.wattsupmedia.net/portal",
                  "_blank"
                );
              }}
            >
              Book a Shoot
            </Button>
            <Button
              onClick={() => scrollToSection("#portfolio")}
              size="lg"
              className="w-full sm:w-auto bg-white/15 text-white  hover:bg-white/20"
            >
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
