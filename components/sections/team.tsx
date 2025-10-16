"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/section-header";

export default function Team() {
  const team = [
    { name: "Thomas Watts", role: "CEO", image: "/Thomas Watts.webp" },
    {
      name: "Montgomery Webb",
      role: "Photographer / Videographer",
      image: "/Montgomery Webb.webp",
    },
    { name: "Grace Watts", role: "COO", image: "/Grace Watts.webp" },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l">
          {team.map((member, i) => (
            <div key={i} className="border-r">
              <div className="aspect-square">
                <Image
                  width={350}
                  height={500}
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role} at Watts Up Media`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-end p-5"
              >
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
