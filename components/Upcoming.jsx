import { useState } from "react";
import "./Upcoming.css";

export default function Upcoming() {
    var [event, setEvent] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    function handleChange(event) {
        var {name, value} = event.target;
        setEvent((preval)=>{
            return {
                ...preval,
                [name]: value,
            }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
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
                <label for="name">Name of the Event : </label>
                <input type="text" id="name" name="name" value={event.name} onChange={handleChange}/>
                <label for="description">Description : </label>
                <textarea id="description" name="description" value={event.description} onChange={handleChange} rows={5}/>
                <label for="startDate">Start Date : </label>
                <input type="date" id="startDate" name="date" value={event.date} onChange={handleChange} />
                <label for="endDate">End Date : </label>
                <input type="date" id="endDate" name="date" value={event.date} onChange={handleChange} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}