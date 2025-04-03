"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavbarDemo } from "../Navbar/page";

interface ContactInfo {
  name: string;
  mailId: string;
  content: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  feedback: string;
}

export default function Contact() {
  const [info, setInfo] = useState<ContactInfo>({
    name: "",
    mailId: "",
    content: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewName, setReviewName] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInfo({ name: "", mailId: "", content: "" });
  }

  function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reviewName || rating === 0) {
      alert("Please enter your name and rating.");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: reviewName,
      rating,
      feedback,
    };
    setReviews([newReview, ...reviews]);
    setReviewName("");
    setRating(0);
    setHover(0);
    setFeedback("");
  }

  const address =
    "Human Team Foundation, 47, navnath wadi, laldonger, Sion - Trombay Rd, behind poonam petrol pump, Chembur, Mumbai, Maharashtra 400071";

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px 0px" });

  return (
    <>
      <NavbarDemo />
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-100 text-gray-900 min-h-screen font-sans p-6 sm:p-12">
        <div className="text-center text-4xl font-extrabold my-8 sm:my-12 text-gray-900"
        >
          Together We Become Stronger"

        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">
            Send A Message ✉
          </h1>
          <p className="text-gray-400">An email will be sent to the owner</p>
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mt-6"
          >

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                value={info.name}
                onChange={handleChange}
                placeholder="Full Name"

                className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"

                autoComplete="off"
              />
              <input
                type="email"
                name="mailId"
                value={info.mailId}
                onChange={handleChange}
                placeholder="Email Id"

                className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"

                autoComplete="off"
              />
              <textarea
                name="content"
                value={info.content}
                onChange={handleChange}
                placeholder="Message"
                rows={5}

                className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"

                autoComplete="off"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-md font-bold transition duration-300"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-12">

          <h2 className="text-xl font-semibold text-gray-700">
          
            Find us on the map
          </h2>
          <div className="flex justify-center mt-6">
            <iframe
              width="100%"
              height="400"
              className="rounded-lg shadow-lg"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                address
              )}&output=embed`}
              allowFullScreen
            />
          </div>
        </div>

        <div className="text-center mt-12">
        <h2 className="text-xl font-semibold text-gray-900">Your valuable feedback helps us improve...</h2>
<div className="bg-white p-6 rounded-lg shadow-lg mt-4 max-w-3xl mx-auto border border-gray-300">
  {reviews.map((review) => (
    <div key={review.id} className="text-gray-700 border-b border-gray-300 py-2">
      <p>"{review.feedback || 'No feedback provided.'}"</p>
      <p className="text-gray-600 mt-1">- {review.name} ({"★".repeat(review.rating)})</p>
    </div>
  ))}
  <form onSubmit={handleReviewSubmit} className="flex flex-col mt-4">
    <input type="text" placeholder="Enter Your Name" value={reviewName} onChange={(e) => setReviewName(e.target.value)} className="p-3 my-2 rounded-md bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-300" />
    <div className="flex items-center justify-center space-x-2 text-yellow-500">
      <span>Rate Us:</span>
      {[1, 2, 3, 4, 5].map((num) => (
        <span key={num} className={`cursor-pointer text-xl ${num <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'}`} onClick={() => setRating(num)} onMouseEnter={() => setHover(num)} onMouseLeave={() => setHover(0)}>★</span>
      ))}
    </div>
    <textarea placeholder="Feedback if any" value={feedback} onChange={(e) => setFeedback(e.target.value)} className="p-3 my-2 rounded-md bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-300" rows={3} />
    <button type="submit" className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2 transition duration-300">Submit Review</button>

  </form>
</div>

         

            
          </div>
        

      </motion.div>
      <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-12">
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
  <p className="text-sm">© {new Date().getFullYear()} Human Team Foundation. All rights reserved.</p>
</footer>

    </>
  );
}