"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import "./Upcoming.css";
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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventData = {
      ...event,
      isPast: false,
    };

    try {
      await axios.post("http://localhost:5000/api/events", eventData);
      alert("Event added successfully!");
      setEvent({ name: "", description: "", startDate: "", endDate: "" });
    } catch (error) {
      alert("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="upcoming">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name of the Event:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={event.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={event.description}
          onChange={handleChange}
          rows={5}
        />

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={event.startDate}
          onChange={handleChange}
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={event.endDate}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
