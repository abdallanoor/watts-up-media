"use client";

import { Camera, Smartphone } from "lucide-react";
import SectionHeader from "../section-header";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const services = [
  {
    icon: Camera,
    title: "Real Estate Media",
    description:
      "High-quality photos and cinematic videos for listings, Airbnb, and real estate marketing.",
    image: "/mac.png",
  },
  {
    icon: Smartphone,
    title: "Agent Reels",
    description:
      "We create the scripts, we coach you on where to stand, what to say and how to be confident on camera.",
    image: "/reel.png",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

export default function Services() {
  return (
    <section id="services" className="border-b scroll-mt-16">
      <div className="container border-b">
        <SectionHeader
          label="Services"
          title="What We Offer"
          description="Industry Leading Productions"
        />
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 p-0! overflow-hidden divide-y md:divide-x md:divide-y-0">
        {services.map(({ icon: Icon, title, description, image }, i) => (
          <div key={title} className="p-4 md:p-8 overflow-hidden">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                variants={fadeUp}
                custom={0 + i * 0.3}
                className="flex items-center gap-2 mb-3"
              >
                <Icon size={17} />
                <h3 className="text-lg font-medium">{title}</h3>
              </motion.div>

              <motion.p
                variants={fadeUp}
                custom={0.2 + i * 0.3}
                className="text-base text-muted-foreground"
              >
                {description}
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={0.4 + i * 0.3}
                className="mt-8 relative mx-auto w-[90%] max-w-md mask-b-from-80%"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute -bottom-1 left-0 w-full h-[5px] bg-background z-10" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
