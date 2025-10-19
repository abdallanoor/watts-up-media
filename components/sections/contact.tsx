"use client";

import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/section-header";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Animation setup
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.15 },
  }),
};

// Types
interface ContactLinkProps {
  href: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

// Reusable Components
const ContactLink = ({ href, label, value, icon: Icon }: ContactLinkProps) => (
  <Link href={href} className="group flex items-start gap-3 transition-all">
    <div className="flex flex-col justify-center gap-1">
      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground/70" />
        {label}
      </span>
      <span className="text-sm font-medium group-hover:text-primary transition-colors">
        {value}
      </span>
    </div>
  </Link>
);

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group p-4 rounded-full border border-border bg-background hover:bg-primary hover:border-primary transition-all"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-foreground group-hover:text-primary-foreground transition-colors" />
  </Link>
);

const ContactCard = ({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) => (
  <div className="border-r border-b p-8 flex flex-col gap-6 h-full">
    <motion.h3
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="text-foreground text-lg font-semibold"
    >
      {title}
    </motion.h3>

    <motion.div
      custom={index + 1}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  </div>
);

// Configuration
const contactInfo: ContactLinkProps[] = [
  {
    href: "mailto:thomas@wattsupmedia.net",
    label: "Email",
    value: "thomas@wattsupmedia.net",
    icon: Mail,
  },
  {
    href: "tel:+18506917278",
    label: "Phone",
    value: "(850) 691-7278",
    icon: Phone,
  },
];

const socialLinks: SocialLinkProps[] = [
  {
    href: "https://www.instagram.com/wattsup.homes/",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/thomasdoesmedia",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/channel/UCg2wUyVftv2Zhc_09kRyHWA/videos",
    icon: Youtube,
    label: "YouTube",
  },
];

// Main Component
export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16">
      <div className="container">
        <SectionHeader
          title="Get in Touch"
          label="Contact"
          description="Ready to bring your vision to life? Let's connect."
        />
      </div>

      <div className="container p-0! border-none!">
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l items-stretch">
          <ContactCard title="Contact Us" index={0}>
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
              {contactInfo.map((contact) => (
                <ContactLink key={contact.label} {...contact} />
              ))}
            </div>
          </ContactCard>

          <ContactCard title="Follow Us" index={1}>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>
          </ContactCard>

          <ContactCard title="Ready to Start?" index={2}>
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={() => {
                window.open(
                  "https://listings.wattsupmedia.net/portal",
                  "_blank"
                );
              }}
            >
              Book a Shoot
            </Button>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}
