"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Animation variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 border-b h-16 bg-background z-50">
        <div className="container border-none h-full flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Watts Up Media"
            width={52}
            height={40}
            className="h-10 w-auto"
          />

          <nav className="hidden lg:flex items-center justify-center gap-2 flex-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="link"
                size="sm"
                onClick={() => scrollToSection(item.href)}
                className={`hover:no-underline cursor-pointer px-2 py-1 transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-0 sm:gap-1 md:gap-2">
            <ThemeToggle />
            <Button className="max-lg:hidden">Book a Shoot</Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full cursor-pointer hover:bg-transparent!"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-background z-40 lg:hidden pt-16"
          >
            <div className="container h-full flex flex-col items-center justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Button
                    variant="link"
                    size="lg"
                    onClick={() => scrollToSection(item.href)}
                    className={`text-3xl hover:no-underline cursor-pointer transition-all duration-300 ${
                      activeSection === item.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}

              <motion.div
                custom={navItems.length}
                variants={itemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-8"
              >
                <Button
                  size="lg"
                  className="px-8"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book a Shoot
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
