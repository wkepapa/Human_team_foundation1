"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function Upcoming(): JSX.Element {
  const [event, setEvent] = useState<EventData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [postToInstagram, setPostToInstagram] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("description", event.description);
    formData.append("startDate", event.startDate);
    formData.append("endDate", event.endDate);
    formData.append("isPast", "false");
    formData.append("postToInstagram", String(postToInstagram));
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event added successfully!");
      setEvent({ name: "", description: "", startDate: "", endDate: "" });
      setPostToInstagram(false);
      setImage(null);
    } catch (error) {
      alert("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="upcoming p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name of the Event:</span>
          <input
            type="text"
            name="name"
            value={event.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Start Date:</span>
          <input
            type="date"
            name="startDate"
            value={event.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">End Date:</span>
          <input
            type="date"
            name="endDate"
            value={event.endDate}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Event Banner Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border rounded px-3 py-2 bg-white"
          />
        </label>

        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-700">Post to Instagram</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={postToInstagram}
              onChange={() => setPostToInstagram((prev) => !prev)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-400 transition-all duration-300" />
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5" />
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
}
