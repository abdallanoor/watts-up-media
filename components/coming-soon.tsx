"use client";

import Image from "next/image";
import AnimatedBackground from "./AnimatedBackground";
import { ThemeToggle } from "./theme-toggle";

export default function ComingSoon() {
  return (
    <div className="font-sans relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <AnimatedBackground />
      <ThemeToggle />

      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Watts Up Media"
              width={320}
              height={80}
              className="w-64 h-auto md:w-80 drop-shadow-2xl"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground tracking-tight">
            Coming Soon
          </h1>

          <p className="text-xl md:text-2xl text-secondary font-extralight">
            Real Estate Photography & Video
          </p>
        </div>
      </div>
    </div>
  );
}
