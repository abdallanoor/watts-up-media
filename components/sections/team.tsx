"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/section-header";

const team = [
  { name: "Thomas Watts", role: "CEO", image: "/Thomas Watts.webp" },
  { name: "Grace Watts", role: "COO", image: "/Grace Watts.webp" },
  {
    name: "Isaac Winkler",
    role: "Photographer / Videographer",
    image: "/Isaac Winkler.webp",
  },
  {
    name: "Montgomery Webb",
    role: "Photographer / Videographer",
    image: "/Montgomery Webb.webp",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
  },
  viewport: { once: true },
});

export default function Team() {
  return (
    <section id="team" className="border-b scroll-mt-16">
      <div className="container">
        <SectionHeader
          label="Team"
          title="Meet the Team"
          description="The creative minds behind Watts Up Media"
        />
      </div>

      <div className="container p-0! border-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l">
          {team.map(({ name, role, image }, i) => (
            <div key={i} className="border-r">
              <div className="p-4 md:p-2 pb-0! border-t">
                <motion.div className="aspect-square" {...fadeUp(i * 0.2)}>
                  <Image
                    width={300}
                    height={300}
                    src={image}
                    alt={`${name}, ${role}`}
                    className="w-full h-full object-cover grayscale rounded-md"
                  />
                </motion.div>
              </div>

              <motion.div
                {...fadeUp(i * 0.2 + 0.1)}
                className="flex flex-col items-center p-4"
              >
                <p className="font-bold">{name}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
