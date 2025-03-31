import { useState } from "react";
import './PaymentForm.css'
function PaymentForm({amount}) {
    const [activeTab, setActiveTab] = useState("card");

    return (
        <div className="payment-container">
            {/* Tabs */}
            <div className="tabs">
                <button className={activeTab === "card" ? "active" : ""} onClick={() => setActiveTab("card")}>Card Payment</button>
                <button className={activeTab === "upi" ? "active" : ""} onClick={() => setActiveTab("upi")}>UPI Payment</button>
                <button className={activeTab === "net" ? "active" : ""} onClick={() => setActiveTab("net")}>Net Banking</button>
            </div>
             <h3 className="donation-amount">You are donating ₹{amount}</h3>
            {/* Content */}
            <div className="form-container">
                {activeTab === "card" && (
                    <div className="card-form">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" />

                        <div className="row">
                            <div>
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM/YY" />
                            </div>
                            <div>
                                <label>CVV</label>
                                <input type="password" placeholder="123" />
                            </div>
                        </div>
                        <div className="user-info">
                            <label>Name on Card</label>
                            <input type="text" />
                        </div>
                        <div className="user-info">
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <button className="complete-donation">Complete Donation</button>
                    </div>
                )}

                {activeTab === "upi" && (
                    <div className="upi-form">
                        <label>UPI ID</label>
                        <input type="text" placeholder="example@upi" />
                        <button className="complete-donation">Complete Donation</button>
                    </div>
                )}

                {activeTab === "net" && (
                    <div className="net-banking-form">
                        <label>Select Bank  </label>
                        <select>
                            <option>HDFC Bank</option>
                            <option>SBI Bank</option>
                            <option>ICICI Bank</option>
                        </select><br />
                        <label>Name</label>
                        <input type="text" placeholder="" />
                        <label>Email</label>
                        <input type="text" placeholder="" />

                        <button className="complete-donation">Complete Donation</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentForm;
