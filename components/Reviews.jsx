import { useState } from "react";
import "./Reviews.css";

export default function Reviews(){
    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || rating === 0) {
        alert("Please enter your name and rating.");
        return;
      }
  
      const newReview = { name, rating, feedback, id: Date.now() };
      setReviews([newReview, ...reviews]);
  
      // Clear the form
      setName("");
      setRating(0);
      setHover(0);
      setFeedback("");
    };
  
    return (
      <div className="review-container">
        <h2>Leave a Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
  
          <div className="rating-container">
            <span>Rate Us:</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`star ${num <= (hover || rating) ? "filled" : "outlined"}`}
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
            className="input-field"
            rows={5}
          />
  
          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>
      </div>
    );
}