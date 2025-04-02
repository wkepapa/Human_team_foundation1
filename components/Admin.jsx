import { useState } from "react";
import "./Admin.css";
import Past from "./Past";
import Upcoming from "./Upcoming";

export default function Admin() {
    const text = "Admin Dashboard"; 
    var [upcoming, setUpcoming] = useState(false); 
    var [past, setPast] = useState(false); 

    function showUpcoming(){
        setUpcoming(true);
        setPast(false);
    }

    function showPast(){
        setPast(true);
        setUpcoming(false);
    }

    return (
        <div>
            <div className="bg-admin">
                <div className="admin">
                    <h1>
                        {text.split("").map((char, index) => (
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
                {upcoming && <Upcoming/>}
                {past && <Past/>}
            </div>
        </div>
    );
}
