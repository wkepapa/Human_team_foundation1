"use client";

import { useState } from "react";

export default function AdminDashboard() {
  const [people, setPeople] = useState([
    { name: "Olivia Martin", email: "m@example.com" },
    { name: "Isabella Nguyen", email: "b@example.com" },
    { name: "Sofia Davis", email: "p@example.com" },
    { name: "Liam Johnson", email: "l@example.com" },
  ]);

  const [activeTab, setActiveTab] = useState("Upcoming Events");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const glassCard =
    "bg-white/20 backdrop-blur-lg border border-gray-300 shadow-xl";

  const renderForm = () => (
    <div className={`rounded-3xl p-8 ${glassCard}`}>
      <h2 className="text-3xl font-bold mb-4 text-center text-black tracking-tight border-b border-gray-300 pb-4">
        {activeTab}
      </h2>
      <p className="text-gray-800 mb-6 text-center">
        Fill in the event details below.
      </p>

      <div className="flex mb-6 border border-gray-300 rounded-full overflow-hidden w-fit mx-auto shadow-sm">
        {["Upcoming Events", "Past Events"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-48 py-2 text-sm font-semibold transition-all duration-300 ease-in-out ${
              activeTab === tab
                ? "bg-white text-black shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-5 border-t border-gray-300 pt-6">
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          className="w-full p-4 border border-gray-300 rounded-2xl bg-white/60 text-black placeholder-gray-700 focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-2xl bg-white/60 text-black focus:ring-2 focus:ring-black focus:outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-4 border border-gray-300 rounded-2xl bg-white/60 text-black min-h-[100px] focus:ring-2 focus:ring-black focus:outline-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full p-2 border border-gray-300 rounded-2xl bg-white/60 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
        />
      </div>

      <div className="flex justify-between mt-8 border-t border-gray-300 pt-6">
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800">
          Submit
        </button>
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800">
          Post to Insta
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-black font-sans p-6">
      <div className="text-5xl font-extrabold text-center mb-14 text-black tracking-tight border-b border-gray-300 pb-6">
        Admin Dashboard
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>{renderForm()}</div>

        <div className={`rounded-3xl p-8 ${glassCard}`}>
          <h2 className="text-3xl font-bold mb-4 text-center text-black border-b border-gray-300 pb-4">
            Volunteers
          </h2>
          <p className="text-gray-800 mb-6 text-center">
            Manage access and actions for volunteers.
          </p>

          <div className="flex gap-3 mb-6 border-b border-gray-300 pb-6">
            <input
              placeholder="Search volunteers..."
              className="flex-1 p-3 border border-gray-300 rounded-2xl bg-white/60 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800">
              Search
            </button>
          </div>

          <div className="space-y-5">
            {people.map((person, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border border-gray-300 rounded-2xl p-4 bg-white/60 backdrop-blur-sm hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-white border border-gray-400 rounded-full flex items-center justify-center font-bold text-black">
                  {person.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg text-black">
                    {person.name}
                  </div>
                  <div className="text-sm text-gray-700">{person.email}</div>
                </div>
                <button
                  className={`${
                    idx < 2
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "bg-white hover:bg-gray-200 text-black"
                  } text-sm font-semibold px-5 py-1.5 rounded-full transition`}
                >
                  {idx < 2 ? "Accept" : "Mail"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
