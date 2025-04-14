"use client";
import { useState } from "react";
import "./Admin.css";
import Past from "./Past";
import Upcoming from "./Upcoming";
import Volunteer from "./Volunteer";

export default function Admin(): JSX.Element {
    const text: string = "Admin Dashboard";

    // Login state
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Dashboard section states
    const [upcoming, setUpcoming] = useState<boolean>(false);
    const [past, setPast] = useState<boolean>(false);
    const [volunteer, setVolunteer] = useState<boolean>(false);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (username === "admin" && password === "303@32") {
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials!");
        }
    }

    function showUpcoming(): void {
        setUpcoming(true);
        setPast(false);
        setVolunteer(false);
    }

    function showPast(): void {
        setPast(true);
        setUpcoming(false);
        setVolunteer(false);
    }

    function showVolunteer(): void {
        setVolunteer(true);
        setPast(false);
        setUpcoming(false);
    }

    return (
        <div>
            {!isLoggedIn ? (
                <div className="login-container">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </div>
            ) : (
                <>
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
                        <div className="card">
                            <h2>Access Associated Volunteers</h2>
                            <button className="event-btn" onClick={showVolunteer}>Show Volunteers</button>
                        </div>
                        {upcoming && <Upcoming />}
                        {past && <Past />}
                        {volunteer && <Volunteer />}
                    </div>
                </>
            )}
        </div>
    );
}
