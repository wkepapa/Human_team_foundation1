"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { NavbarDemo } from "../../Navbar/page";
import { FaCreditCard, FaPaypal, FaApple } from "react-icons/fa";

export default function Donation() {
  const { name } = useParams();
  
  // Check if name is an array and pick the first element if it is
  const serviceName = Array.isArray(name) ? decodeURIComponent(name[0]) : decodeURIComponent(name || "Donation");

  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [amount, setAmount] = useState(50);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Perform your submission logic (e.g., Axios call)
    setTimeout(() => {
      alert(`Donation of ₹${amount} made successfully!`);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 my-14">
      <NavbarDemo />
      <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-2">
          Donate for {serviceName}
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Your contribution makes a difference!
        </p>

        {/* Donation Amount Selection */}
        <div className="flex justify-center space-x-3 mb-6">
          {[50, 100, 250].map((amt) => (
            <button
              key={amt}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 text-white font-semibold ${
                amount === amt
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-700"
              }`}
              onClick={() => setAmount(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter custom amount"
        />

        {/* Payment Method Selection */}
        <div className="flex space-x-3 mb-6">
          {[{ name: "Card", icon: <FaCreditCard /> }, { name: "Paypal", icon: <FaPaypal /> }, { name: "Apple", icon: <FaApple /> }].map((method) => (
            <button
              key={method.name}
              className={`flex-1 p-4 border rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ${
                selectedMethod === method.name
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-700"
              }`}
              onClick={() => setSelectedMethod(method.name)}
            >
              {method.icon} <span className="font-semibold">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          {/* Show these only when Card payment method is selected */}
          {selectedMethod === "Card" && (
            <>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="Card Number"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-1/2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="CVC"
                  className="w-1/2 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 ${isSubmitting ? "bg-gray-500" : "bg-blue-500"} text-white font-semibold rounded-lg mt-3 hover:bg-blue-600 transition-all duration-300 shadow-lg`}
          >
            {isSubmitting ? "Processing..." : `Donate ₹${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
}
