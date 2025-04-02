"use client";
import { useState } from "react";
import { NavbarDemo } from "../Navbar/page";
import { FaCreditCard, FaPaypal, FaApple } from "react-icons/fa";

export default function Donation() {
  const [selectedMethod, setSelectedMethod] = useState("Card");

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center py-10 my-14">
      <NavbarDemo />
      <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-96 border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-2">Support a Cause</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Your donation will support underprivileged children's education.
        </p>
        <div className="flex space-x-3 mb-6">
          {[
            { name: "Card", icon: <FaCreditCard /> },
            { name: "Paypal", icon: <FaPaypal /> },
            { name: "Apple", icon: <FaApple /> },
          ].map((method) => (
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
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="City"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex space-x-2">
            <select className="w-1/3 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Month</option>
            </select>
            <select className="w-1/3 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Year</option>
            </select>
            <input
              type="text"
              placeholder="CVC"
              className="w-1/3 p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-3 hover:bg-blue-600 transition-all duration-300 shadow-lg">
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
}
