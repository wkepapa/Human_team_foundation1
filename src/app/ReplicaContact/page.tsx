"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useRef } from "react";
import axios from "axios";
import { NavbarDemo } from "../Navbar/page";
import { motion, useInView } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  rating: number;
  feedback: string;
}

export default function Contact() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 0,
    feedback: "",
  });

  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const address =
    "Human Team Foundation, 47, navnath wadi, laldonger, Sion - Trombay Rd, behind poonam petrol pump, Chembur, Mumbai, Maharashtra 400071";

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { triggerOnce: true });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", {
        name: contactData.name,
        mailId: contactData.email,
        content: contactData.message,
      });
      toast.success("Message sent successfully");
      setContactData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewData.name || reviewData.rating === 0) {
      toast.error("Please provide name and rating");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/reviews", {
        name: reviewData.name,
        rating: reviewData.rating,
        comment: reviewData.feedback,
      });

      const newReview = {
        id: Date.now(),
        name: reviewData.name,
        rating: reviewData.rating,
        feedback: reviewData.feedback,
      };
      setReviews([newReview, ...reviews]);
      toast.success("Review submitted!");
      setReviewData({ name: "", rating: 0, feedback: "" });
      setHover(0);
    } catch {
      toast.error("Error submitting review");
    }
  };

  return (
    <>
      <NavbarDemo />
      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-16 gap-16 mt-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-[#0e0e0e] dark:via-[#121212] dark:to-[#1a1a1a] min-h-screen overflow-hidden">
        {/* Top Circle Glow */}
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 opacity-20 dark:opacity-30 rounded-full blur-[120px] z-0" />

        <motion.h1
          className="relative z-10 text-center text-4xl font-extrabold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Together We Become Stronger
        </motion.h1>

        {/* Circle glow above form section */}
        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 opacity-20 dark:opacity-30 rounded-full blur-[100px] z-0" />

        {/* Forms Section */}
        <div className="flex flex-col md:flex-row w-full gap-12 mt-8 justify-center items-start">
          {/* Contact Form */}
          <form
            onSubmit={handleContactSubmit}
            className="flex flex-col backdrop-blur-lg bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-2xl p-8 rounded-2xl w-full md:w-[48%] space-y-6 transition-all hover:scale-[1.01]"
          >
            <div>
              <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Send A Message
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                We'll get back to you via email
              </p>
            </div>

            {["name", "email", "message"].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field[0].toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={(contactData as any)[field]}
                  onChange={handleContactChange}
                  placeholder={`Your ${
                    field[0].toUpperCase() + field.slice(1)
                  }`}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 text-center font-semibold rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] transition-transform duration-200"
            >
              Submit
            </button>
          </form>

          {/* Review Form */}
          <form
            onSubmit={handleReviewSubmit}
            className="backdrop-blur-lg bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-2xl p-8 rounded-2xl w-full md:w-[48%] space-y-6 transition-all hover:scale-[1.01]"
          >
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Leave a Review
            </h2>

            <div className="space-y-2">
              <Label htmlFor="reviewName">Name</Label>
              <Input
                id="reviewName"
                name="name"
                value={reviewData.name}
                onChange={handleReviewChange}
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2 text-yellow-400 text-xl">
                {[1, 2, 3, 4, 5].map((num) => (
                  <motion.span
                    key={num}
                    whileHover={{ scale: 1.2 }}
                    className={`cursor-pointer transition-colors duration-200 ${
                      num <= (hover || reviewData.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    onClick={() =>
                      setReviewData({ ...reviewData, rating: num })
                    }
                    onMouseEnter={() => setHover(num)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Input
                id="feedback"
                name="feedback"
                value={reviewData.feedback}
                onChange={handleReviewChange}
                placeholder="Share your experience"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-center font-semibold rounded-xl bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] transition-transform duration-200"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Review List */}
        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-4 backdrop-blur-md bg-white/30 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-gray-700 dark:text-gray-300 shadow-md"
            >
              <p className="italic">"{r.feedback}"</p>
              <p className="mt-1 font-semibold">
                - {r.name} ({`★`.repeat(r.rating)})
              </p>
            </div>
          ))}
        </div>

        {/* Google Map */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={mapInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-full mt-8 rounded-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Find us on the map
            </h2>
          </div>
          <iframe
            className="w-full h-[450px] md:h-[500px] lg:h-[600px] rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-lg"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address
            )}&output=embed`}
            allowFullScreen
          />
        </motion.div>
      </div>
    </>
  );
}
