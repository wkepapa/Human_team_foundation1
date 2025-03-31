"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Human Team Foundation is committed to creating lasting positive change in communities through three core initiatives: food security, education access, and environmental conservation. We believe in a world where every person has access to basic necessities and opportunities for growth.`;

export function TextGenerateEffectDemo() {
  return (
    <TextGenerateEffect words={words} className=" my-8 mx-20 text-center" />
  );
}
