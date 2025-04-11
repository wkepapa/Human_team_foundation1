"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import axios from "axios";

const staticTestimonials = [
  {
    quote:
      "If you want to join or ask any queries, contact Niraj Mishra. You will get all information on the Facebook page. (Rating: 5)",
    name: "Ajinkya Bhabal",
    title: "Review from 7 years ago",
  },

  {
    quote: "Thanks so much for sharing your experience with us. (Rating: 5)",
    name: "Sneha Gon",
    title: "Review from 5 years ago",
  },
];

export function InfiniteMovingCardsDemo() {
  const [fetchedTestimonials, setFetchedTestimonials] = useState([]);
  const [combinedTestimonials, setCombinedTestimonials] =
    useState(staticTestimonials);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        const fetched = response.data;

        const formatted = fetched.map((review: any) => ({
          quote: `${review.comment} (Rating: ${review.rating})`,
          title: new Date(review.createdAt).toLocaleDateString(),
          name: review.name,
        }));

        setFetchedTestimonials(formatted);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    setCombinedTestimonials([...staticTestimonials, ...fetchedTestimonials]);
  }, [fetchedTestimonials]);

  return (
    <div className="h-[24rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      {combinedTestimonials.length > 0 && (
        <InfiniteMovingCards
          items={combinedTestimonials}
          direction="right"
          speed="fast"
        />
      )}
    </div>
  );
}
