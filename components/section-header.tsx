import React from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
}

export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center flex flex-col gap-2">
      {/* <p className="text-sm font-medium">{label}</p> */}

      <h2 className="text-primary text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
        {title}
      </h2>

      <p className="text-center text-sm font-medium tracking-tight md:text-sm lg:text-base text-muted-foreground mx-auto max-w-lg">
        {description}
      </p>
    </div>
  );
}
