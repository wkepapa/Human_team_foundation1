"use client";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import "./Upcoming.css";
import axios from "axios";

interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imageName?: string;
  imagePreview?: string;
}

export default function Upcoming(): JSX.Element {
  const [event, setEvent] = useState<EventData>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    imageName: "",
    imagePreview: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvent((prev) => ({
          ...prev,
          imagePreview: reader.result as string,
          imageName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("description", event.description);
    formData.append("startDate", event.startDate);
    formData.append("endDate", event.endDate);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("eventImage", file); // Must match `upload.single("eventImage")`
    }

    try {
      await axios.post("http://localhost:5000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event added successfully!");
      setEvent({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        imageName: "",
        imagePreview: "",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      alert("Failed to add event. Please try again.");
      console.error(error);
    }
  };

  const postToInstagram = async () => {
    try {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        alert("Please select an image to post.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        await axios.post("http://localhost:5000/api/instagram/post", {
          name: event.name,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          image: base64Image,
        });
        alert("Event posted to Instagram successfully!");
      };

      reader.readAsDataURL(file);
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
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {event.imageName && (
          <p style={{ fontStyle: "italic", marginTop: "5px" }}>
            Selected file: {event.imageName}
          </p>
        )}

        {event.imagePreview && (
          <div style={{ marginTop: "10px" }}>
            <strong>Preview:</strong>
            <img src={event.imagePreview} alt="Preview" width="200" />
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
