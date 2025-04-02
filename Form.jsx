import "./Form.css";
import PaymentForm from "./PaymentForm";
import { useState } from "react";

function Form(){

    const [selectedAmount, setSelectedAmount] = useState(50); // Default amount

    // Handle button click for preset amounts
    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
    };

    // Handle custom amount input
    const handleCustomAmount = (e) => {
        setSelectedAmount(Number(e.target.value) || 0);
    };

    return <>
        <h1>Make a Difference Today</h1>
        <div className="main-container">
            
        <div className="left-part">
                    <div className="amt-cards">
                        {[50, 100, 250].map((amount) => (
                            <div
                                key={amount}
                                className={`amt-menu-card ${selectedAmount === amount ? "active" : ""}`}
                                onClick={() => handleAmountClick(amount)}
                            >
                                ₹{amount}
                            </div>
                        ))}
                    </div>
                    <div className="custom">
                        <label htmlFor="amt">Custom amount:</label>
                        <input
                            type="number"
                            id="amt"
                            name="amt"
                            onChange={handleCustomAmount}
                            value={selectedAmount || ""}
                        />
                    </div>
                    <div className="donate-opt">
                        <PaymentForm amount={selectedAmount} /> {/* Pass amount to PaymentForm */}
                    </div>
                </div>
            <div className="right-part">
                <div className="donating-for">
                    <h2>You are Donating for ...</h2>
                    <p style={{color: '#0D8AA3'}}>Your donation helps us create lasting changes:</p>
                    <ul>
                        <li>₹50 provides clean water for a family</li>
                        <li>₹100 funds education for a child</li>
                        <li>₹250 builds sustainable housing</li>
                    </ul>
                </div>
                <div className="promise">
                    <h2>Our Promise</h2>
                    <p>100% of your donation goes directly to our programs. We ensure complete transperency and accountability in how your contribution makes an impact.</p>
                </div>
            </div>
        </div>

        <footer>
            {/*add link component to locate to desired page*/}
            <p>Home | Contact | Donate</p>
            <p>©2024 Human Team Foundation. All rights reserved.</p>
        </footer>
    </>
}
export default Form