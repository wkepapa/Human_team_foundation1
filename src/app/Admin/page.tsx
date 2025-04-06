"use client"
import { useState } from "react";
import "./Admin.css";
import Past from "./Past";
import Upcoming from "./Upcoming";

export default function Admin(): JSX.Element {
    const text: string = "Admin Dashboard";
    const [upcoming, setUpcoming] = useState<boolean>(false);
    const [past, setPast] = useState<boolean>(false);

    function showUpcoming(): void {
        setUpcoming(true);
        setPast(false);
    }

    function showPast(): void {
        setPast(true);
        setUpcoming(false);
    }

    return (
        <div>
            <div className="bg-admin">
                <div className="admin">
                    <h1>
                        {text.split("").map((char: string, index: number) => (
                            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>
            <div className="functions">
                <div className="card">
                    <h2>Add Upcoming Events</h2>
                    <button className="event-btn" onClick={showUpcoming}>Upcoming Events</button>
                </div>

                <div className="card">
                    <h2>Describe Past Events</h2>
                    <button className="event-btn" onClick={showPast}>Past Events</button>
                </div>
                {upcoming && <Upcoming />}
                {past && <Past />}
            </div>
        </div>
    );
}
