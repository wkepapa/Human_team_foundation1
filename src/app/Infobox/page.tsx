import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "579",
    description: "Meals Served",
  },
  {
    title: "576",
    description: "Students Educated",
  },
  {
    title: "75",
    description: "Beaches Cleaned",
  },
  {
    title: "25",
    description: "NGO Partners",
  },
];
