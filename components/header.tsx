"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // setIsMobileMenuOpen(false);
    }
  };

  return (
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

        <div>
          <ThemeToggle />
          <Button className="rounded-none cursor-pointer ms-3 max-lg:hidden">
            Book a Shoot
          </Button>
        </div>
      </div>
    </header>
  );
}
