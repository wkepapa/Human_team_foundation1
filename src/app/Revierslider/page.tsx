"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[24rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The main thing an NGO should do is help the needy ones and show the care and love to all the living beings irrespective of their caste, sex and creed. I am glad this is one such NGO and proud to be a member of it.",
    name: "Bhavya Shah",
    title: "Review from 5 years ago",
  },
  {
    quote:
      "My experience is amazing! They are actually helping people in need and doing a great job, also the food quality is great, rest assured. Big thanks to Human Team Foundation.",
    name: "Abhishek Banerjee",
    title: "Review from 3 years ago",
  },
  {
    quote:
      "If you want to join or ask any queries, contact Niraj Mishra. You will get all information on the Facebook page.",
    name: "Ajinkya Bhabal",
    title: "Review from 7 years ago",
  },
  {
    quote:
      "Keep up the good work!!! They are really helping the needy ones!!!!!",
    name: "Urmi Jain",
    title: "Review from 5 years ago",
  },
  {
    quote: "Got prompt answer to my SMS... 🙏🏻",
    name: "Vaishakhi Parikh",
    title: "Review from a year ago",
  },
  {
    quote: "Great work done by them.",
    name: "Kevin Shah",
    title: "Review from 5 years ago",
  },
  {
    quote: "GOOD JOB",
    name: "Akshada Shewale",
    title: "Review from 8 years ago",
  },
  {
    quote: "Thanks so much for sharing your experience with us.",
    name: "Vishal Singh",
    title: "Review from 3 years ago",
  },
  {
    quote: "Thanks so much for sharing your experience with us.",
    name: "Sneha Gon",
    title: "Review from 5 years ago",
  },
  {
    quote: "Thanks so much for sharing your experience with us.",
    name: "Riddhik Prajapati",
    title: "Review from 5 years ago",
  },
  {
    quote: "Thanks so much for sharing your experience with us.",
    name: "Pradeep Y",
    title: "Review from 5 years ago",
  },
  {
    quote: "Thank you",
    name: "Nida Tambe",
    title: "Review from 5 years ago",
  },
  {
    quote: "Thanks so much for sharing your experience with us.",
    name: "Patel Akshay",
    title: "Review from 6 years ago",
  },
  {
    quote: "Thank you",
    name: "Ravi",
    title: "Review from 6 years ago",
  },
];