import { useState, ChangeEvent, FormEvent } from "react";
import "./Upcoming.css";

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

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        // Optionally do something with event data here
        setEvent({
            name: "",
            description: "",
            startDate: "",
            endDate: "",
        });
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

                <button type="submit">Add</button>
            </form>
        </div>
    );
}
