import Image from "next/image";
import React from "react";
import SectionHeader from "./section-header";

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
      <div className="container py-10">
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
              <div className="aspect-[3/4] relative">
                <Image
                  fill
                  src={member.image}
                  alt={member.name}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-end p-5">
                <p className="font-bold">{member.name}</p>
                <p className="text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
