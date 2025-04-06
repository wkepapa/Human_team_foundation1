import { useState, ChangeEvent, FormEvent } from "react";
import "./Upcoming.css";
import axios from "axios";

interface EventData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    images: string | null;
}

export default function Past(): JSX.Element {
    const [event, setEvent] = useState<EventData>({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        images: null,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
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
        isPast: true, // or false for Upcoming
      };
      await axios.post("http://localhost:5000/api/events", eventData);
      setEvent({ name: "", description: "", startDate: "", endDate: "", images: null });
    };
    

    function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvent((prev) => ({
                    ...prev,
                    images: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

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

                <label htmlFor="images">Add Image:</label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button type="submit">Add</button>
            </form>
        </div>
    );
}
