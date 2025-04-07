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
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TimelineDemo } from "./Upmcomingevents/page";

interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isPast: boolean;
}

export default function Home() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
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
      <div>
        <h1></h1>
        <StickyScrollRevealDemo />
      </div>
      <TimelineDemo />

      <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-12 w-full">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Human Team Foundation. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
