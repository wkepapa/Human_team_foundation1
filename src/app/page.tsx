"use client";
import { div } from "framer-motion/client";
import { NavbarDemo } from "./Navbar/page";
import { TextGenerateEffectDemo } from "./Textgenerate/page";
import { ImagesSliderDemo } from "./Imageslider/page";
import { MeteorsDemo } from "./Box/page";
import { CardHoverEffectDemo } from "./Infobox/page";
import { InfiniteMovingCardsDemo } from "./Revierslider/page";
import React from "react";
import { motion } from "motion/react";
import { BackgroundGradientDemo } from "./Workbox/page";
import { StickyScrollRevealDemo } from "./Stickyscroll/page";

export default function Home() {
  return (
    <div className="  h-screen ">
      <NavbarDemo />
      <ImagesSliderDemo />
      <div className="m-10">
        <h1 className="text-6xl font-bold text-center ">
          We rise by lifting others
        </h1>
        <h2 className="text-2xl font-bold text-center mt-5">
          We are dedicated to creating positive change through sustainable
          initiatives in food security, education, and environmental
          conservation.
        </h2>
        <CardHoverEffectDemo />
      </div>
      <div className="m-10">
        <h1 className="text-6xl font-bold text-center ">OUR MISSION</h1>
        <TextGenerateEffectDemo />
        <div className="flex gap-3 mx-18">
          <MeteorsDemo
            title="Our Vision"
            description="To create a world where every individual has access to food, quality education, and a clean environment, fostering sustainable development and community empowerment."
          />
          <MeteorsDemo
            title="Our Values"
            description="We are committed to transparency in all operations, creating a sustainable impact, embracing a community-driven approach, and upholding environmental responsibility."
          />
        </div>
      </div>
      <InfiniteMovingCardsDemo />
      <div>
        <h1 className="text-6xl font-bold text-center ">OUR WORK</h1>
        <div className="m-10 flex gap-6 mx-20">
          <BackgroundGradientDemo
            title="Food Security Program"
            description="Providing nutritious meals to communities in need through our network of food banks and mobile kitchens."
            image="/images/pic2.jpg"
          />
          <BackgroundGradientDemo
            title="Education Support"
            description="Empowering children and youth through educational resources, scholarships, and mentorship programs."
            image="/images/pic8.jpg"
          />
          <BackgroundGradientDemo
            title="Environmental Conservation"
            description="Promoting sustainability through tree planting, waste management, and clean energy initiatives."
            image="/images/pic4.jpg"
          />
        </div>
      </div>
      <StickyScrollRevealDemo />
    </div>
  );
}
