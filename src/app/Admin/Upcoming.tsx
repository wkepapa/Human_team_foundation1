"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Upcoming.css";
import axios from "axios";

interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string; // base64 image string
  imageName?: string; // just for display
}

export default function Upcoming(): JSX.Element {
  const [event, setEvent] = useState<EventData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    imageName: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload and convert to base64
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
          imageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData = {
      ...event,
      isPast: false,
    };

    try {
      await axios.post("http://localhost:5000/api/events", eventData);
      alert("Event added successfully!");
      setEvent({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        imageUrl: "",
        imageName: "",
      });
    } catch (error) {
      alert("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  const postToInstagram = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/instagram/post", {
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        image: event.imageUrl,
      });
      alert("Event posted to Instagram successfully!");
    } catch (err) {
      console.error("Error posting to Instagram", err);
      alert("Failed to post to Instagram.");
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

        <label htmlFor="image">Add Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        {event.imageName && (
          <p style={{ fontStyle: "italic", marginTop: "5px" }}>
            Selected file: {event.imageName}
          </p>
        )}

        {event.imageUrl && (
          <div style={{ marginTop: "10px" }}>
            <strong>Preview:</strong>
            <img src={event.imageUrl} alt="Preview" width="200" />
          </div>
        )}

        <button type="submit">Add Event</button>
        <button type="button" onClick={postToInstagram}>
          Post to Instagram
        </button>
      </form>
    </div>
  );
}
