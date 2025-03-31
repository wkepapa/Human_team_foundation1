"use client";
import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "/images/pic2.jpg",
    "/images/pic3.jpg",
    "/images/pic4.jpg",
    "/images/pic5.webp",
    "/images/pic6.jpg",
    "/images/pic7.jpg",
    "/images/pic8.jpg",
  ];
  return (
    <ImagesSlider className="h-[40rem] w-full " images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Our mission is to uplift communities through
          <br /> sustainable initiatives.
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}
