// "use client";
// import axios from "axios";
// import { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
// import { NavbarDemo } from "../Navbar/page";

// interface ContactInfo {
//   name: string;
//   mailId: string;
//   content: string;
// }

// interface Review {
//   id: number;
//   name: string;
//   rating: number;
//   feedback: string;
// }

// export default function Contact() {
//   const [info, setInfo] = useState<ContactInfo>({
//     name: "",
//     mailId: "",
//     content: "",
//   });
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [reviewName, setReviewName] = useState<string>("");
//   const [rating, setRating] = useState<number>(0);
//   const [hover, setHover] = useState<number>(0);
//   const [feedback, setFeedback] = useState<string>("");

//   function handleChange(
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     const { name, value } = event.target;
//     setInfo((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setInfo({ name: "", mailId: "", content: "" });
//   }

//   // Inside your component
//   async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (!reviewName || rating === 0) {
//       alert("Please enter your name and rating.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/reviews", {
//         name: reviewName,
//         rating,
//         comment: feedback,
//       });

//       alert("Review submitted successfully!");

//       const newReview: Review = {
//         id: Date.now(), // This is just local state; in a real app, use response.data.id
//         name: reviewName,
//         rating,
//         feedback,
//       };

//       setReviews([newReview, ...reviews]);
//       setReviewName("");
//       setRating(0);
//       setHover(0);
//       setFeedback("");
//     } catch (error) {
//       console.error(error);
//       alert("Error submitting review");
//     }
//   }

//   const address =
//     "Human Team Foundation, 47, navnath wadi, laldonger, Sion - Trombay Rd, behind poonam petrol pump, Chembur, Mumbai, Maharashtra 400071";

//   const ref = useRef<HTMLDivElement>(null);
//   const isInView = useInView(ref, { triggerOnce: true, margin: "-100px 0px" });

//   return (
//     <>
//       <NavbarDemo />
//       <motion.div
//         ref={ref}
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={isInView ? { scale: 1, opacity: 1 } : {}}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-gray-100 text-gray-900 min-h-screen font-sans p-6 sm:p-12"
//       >
//         <div className="text-center text-4xl font-extrabold my-8 sm:my-12 text-gray-900">
//           Together We Become Stronger"
//         </div>

//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-3xl font-bold mb-4 text-blue-400">
//             Send A Message ✉
//           </h1>
//           <p className="text-gray-400">An email will be sent to the owner</p>
//           <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mt-6">
//             <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={info.name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
//                 autoComplete="off"
//               />
//               <input
//                 type="email"
//                 name="mailId"
//                 value={info.mailId}
//                 onChange={handleChange}
//                 placeholder="Email Id"
//                 className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
//                 autoComplete="off"
//               />
//               <textarea
//                 name="content"
//                 value={info.content}
//                 onChange={handleChange}
//                 placeholder="Message"
//                 rows={5}
//                 className="p-3 rounded-md bg-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
//                 autoComplete="off"
//               />
//               <button
//                 type="submit"
//                 className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-md font-bold transition duration-300"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="text-center mt-12">
//           <h2 className="text-xl font-semibold text-gray-700">
//             Find us on the map
//           </h2>
//           <div className="flex justify-center mt-6">
//             <iframe
//               width="100%"
//               height="400"
//               className="rounded-lg shadow-lg"
//               src={`https://www.google.com/maps?q=${encodeURIComponent(
//                 address
//               )}&output=embed`}
//               allowFullScreen
//             />
//           </div>
//         </div>

//         <div className="text-center mt-12">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Your valuable feedback helps us improve...
//           </h2>
//           <div className="bg-white p-6 rounded-lg shadow-lg mt-4 max-w-3xl mx-auto border border-gray-300">
//             {reviews.map((review) => (
//               <div
//                 key={review.id}
//                 className="text-gray-700 border-b border-gray-300 py-2"
//               >
//                 <p>"{review.feedback || "No feedback provided."}"</p>
//                 <p className="text-gray-600 mt-1">
//                   - {review.name} ({"★".repeat(review.rating)})
//                 </p>
//               </div>
//             ))}
//             <form onSubmit={handleReviewSubmit} className="flex flex-col mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter Your Name"
//                 value={reviewName}
//                 onChange={(e) => setReviewName(e.target.value)}
//                 className="p-3 my-2 rounded-md bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-300"
//               />
//               <div className="flex items-center justify-center space-x-2 text-yellow-500">
//                 <span>Rate Us:</span>
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <span
//                     key={num}
//                     className={`cursor-pointer text-xl ${
//                       num <= (hover || rating)
//                         ? "text-yellow-400"
//                         : "text-gray-400"
//                     }`}
//                     onClick={() => setRating(num)}
//                     onMouseEnter={() => setHover(num)}
//                     onMouseLeave={() => setHover(0)}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <textarea
//                 placeholder="Feedback if any"
//                 value={feedback}
//                 onChange={(e) => setFeedback(e.target.value)}
//                 className="p-3 my-2 rounded-md bg-gray-200 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-blue-300"
//                 rows={3}
//               />
//               <button
//                 type="submit"
//                 className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md mt-2 transition duration-300"
//               >
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//       <footer className="bg-gray-100 text-gray-700 text-center py-6 mt-12">
//         <div className="flex justify-center space-x-6 mb-4">
//           <a href="#" className="text-blue-600 hover:text-blue-800">
//             <FaFacebook size={24} />
//           </a>
//           <a href="#" className="text-pink-600 hover:text-pink-800">
//             <FaInstagram size={24} />
//           </a>
//           <a href="#" className="text-blue-500 hover:text-blue-700">
//             <FaLinkedin size={24} />
//           </a>
//         </div>
//         <p className="text-sm">
//           © {new Date().getFullYear()} Human Team Foundation. All rights
//           reserved.
//         </p>
//       </footer>
//     </>
//   );
// }
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Submit
              <BottomGradient />
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
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] "
              type="submit"
            >
              Submit Review
              <BottomGradient />
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
      <footer className="dark:bg-gray-950 bg-gray-100 dark:text-white text-gray-700 text-center py-6 mt-12 w-full transition-all duration-300">
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
    </>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
