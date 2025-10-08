import Image from "next/image";
import React from "react";

export default function Clients() {
  const clients = [
    { image: "/2023 FINAL stacked Cropped in.png", title: "ELP" },
    { image: "/Lynne Logo.png", title: "Lynne" },
    { image: "/Final Logo 4 copy.png", title: "SUNSET LUXURY" },
    {
      image: "/ThinkRealEstate-Logos-3 (1).png",
      title: "Think Real Estate",
    },
    {
      image: "/WARRENgroupLogoFINAL.png",
      title: "WARREN Group",
    },
    { image: "/HBR Circle Logo w outline.png", title: "HBR" },
    { image: "/Paradise Logo.png", title: "Paradise" },
    { image: "/Spears-Group.png", title: "Spears Group" },
  ];

  return (
    <section>
      <div className="container text-center py-8">
        <p className="text-xs uppercase font-mono text-muted-foreground">
          Trusted by Leading Real Estate Professionals
        </p>
      </div>
      <div className="container border-none px-0!">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l">
          {clients.map((logo, i) => (
            <div
              className="relative group overflow-hidden p-6 min-h-28 flex items-center justify-center border-b border-r"
              key={i}
            >
              <div className="absolute inset-x-0 bottom-0 h-full bg-primary/5 translate-y-full transition-all duration-200 group-hover:translate-y-0 animate-move-left-to-right" />

              <Image
                src={logo.image}
                alt={logo.title}
                width={100}
                height={38}
                className="w-auto h-10 filter grayscale invert-0 dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
