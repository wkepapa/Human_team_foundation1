"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        const upcomingEvents = res.data.filter((event) => !event.isPast);
        const timelineData = upcomingEvents.map((event) => ({
          title: event.name,
          content: (
            <div>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                {event.description}
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-1">
                Start Date: {formatDate(event.startDate)}
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                End Date: {formatDate(event.endDate)}
              </p>
            </div>
          ),
        }));
        setData(timelineData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
