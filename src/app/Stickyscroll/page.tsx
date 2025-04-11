"use client";
import React, { useEffect, useState } from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import axios from "axios";

interface EventData {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  images: string; // base64 or unused if using imageName
  imageName: string;
  isPast: boolean;
}

export function StickyScrollRevealDemo() {
  const [content, setContent] = useState<
    {
      title: string;
      description: string;
      content: React.ReactNode;
    }[]
  >([
    {
      title: "4 July, 2020",
      description:
        "The issue occurred because the StickyScroll component relies on layout measurements based on its content. When dynamic content was appended via useEffect, the component didn't automatically recalculate its scroll breakpoints, leading to incorrect or missing renders unless the screen was resized. This happened because React updated the state, but the dependent layout logic didn’t re-trigger. To solve this, we used a key prop tied to the content length on the StickyScroll component, forcing it to remount and recalculate its layout whenever new content was added.",
      content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <Image
            src="/images/pandemic.jpg"
            alt="pandemic"
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },
  ]);

  // Separate useEffect to append events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        const pastEvents = res.data.filter((event: EventData) => event.isPast);

        const mapped = pastEvents.map((event: EventData) => {
          const imagePath = `/images/${event.imageName}`;
          console.log("Image Path:", imagePath);

          return {
            title: event.startDate,
            description: event.description,
            content: (
              <div className="flex h-full w-full items-center justify-center text-white">
                <Image
                  src={imagePath}
                  alt={event.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover border border-green-500"
                />
              </div>
            ),
          };
        });

        setContent((prev) => [...prev, ...mapped]);
      } catch (err) {
        console.error("Event fetch error:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full py-4">
      <h1 className="text-center mt-20 font-bold text-6xl">Past Events</h1>
      <StickyScroll
        key={content.length} // force re-render when content updates
        content={content}
        contentClassName="block"
      />
    </div>
  );
}
