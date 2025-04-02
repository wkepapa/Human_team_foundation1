"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavbarDemo } from "../Navbar/page";

export default function Contact() {
  const [info, setInfo] = useState({ name: "", mailId: "", content: "" });
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setInfo({ name: "", mailId: "", content: "" });
  }

  function handleReviewSubmit(event) {
    event.preventDefault();
    if (!reviewName || rating === 0) {
      alert("Please enter your name and rating.");
      return;
    }

    const newReview = { name: reviewName, rating, feedback, id: Date.now() };
    setReviews([newReview, ...reviews]);
    setReviewName("");
    setRating(0);
    setHover(0);
    setFeedback("");
  }

  const address =
    "Human Team Foundation, 47, navnath wadi, laldonger, Sion - Trombay Rd, behind poonam petrol pump, Chembur, Mumbai, Maharashtra 400071";

  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, margin: "-100px 0px" });

  return (
    <>
      <NavbarDemo />
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-900 text-white min-h-screen font-sans p-6 my-20"
      >
        <div className="text-center text-4xl font-bold my-10">
          " Together We Become Stronger "
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Send A Message ✉</h1>
          <p className="text-gray-300">An email will be sent to the owner</p>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="text"
                name="name"
                value={info.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 my-2 rounded-md bg-gray-700 text-white focus:outline-none"
                autoComplete="off"
              />
              <input
                type="text"
                name="mailId"
                value={info.mailId}
                onChange={handleChange}
                placeholder="Email Id"
                className="p-3 my-2 rounded-md bg-gray-700 text-white focus:outline-none"
                autoComplete="off"
              />
              <textarea
                name="content"
                value={info.content}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                className="p-3 my-2 rounded-md bg-gray-700 text-white focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-4"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold mt-10">
          Stay connected! Reach out to us anytime at...
        </h2>
        <div className="flex justify-center mt-6">
          <iframe
            width="1250"
            height="400"
            frameBorder="0"
            className="rounded-lg shadow-lg"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              address
            )}&output=embed`}
            allowFullScreen
          />
        </div>
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">
            Your valuable feedback helps us improve...
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="text-gray-300 border-b border-gray-700 py-2"
              >
                <p>"{review.feedback || "No feedback provided."}"</p>
                <p className="text-gray-400 mt-1">
                  - {review.name} ({"★".repeat(review.rating)})
                </p>
              </div>
            ))}
            <form onSubmit={handleReviewSubmit} className="flex flex-col mt-4">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="p-3 my-2 rounded-md bg-gray-700 text-white focus:outline-none"
              />
              <div className="flex items-center space-x-2 text-yellow-500">
                <span>Rate Us:</span>
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={
                      num <= (hover || rating)
                        ? "text-yellow-400 cursor-pointer"
                        : "text-gray-500 cursor-pointer"
                    }
                    onClick={() => setRating(num)}
                    onMouseEnter={() => setHover(num)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                placeholder="Feedback if any"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="p-3 my-2 rounded-md bg-gray-700 text-white focus:outline-none"
                rows={3}
              />
              <button
                type="submit"
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-md mt-2"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10">
          <h2 className="text-xl font-semibold">Feel free to reach us on</h2>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://www.linkedin.com/company/human-team-foundation/"
              className="text-white hover:text-blue-500"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://www.instagram.com/humanteamfoundation/"
              className="text-white hover:text-pink-500"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.facebook.com/humanteamfoundation/"
              className="text-white hover:text-blue-700"
            >
              <FaFacebook size={30} />
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}
