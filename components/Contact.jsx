import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleMap from "./GoogleMap";
import Reviews from "./Reviews";
import "./Contact.css"

export default function Contact() {
    var [info, setInfo] = useState({
        name: "",
        mailId: "",
        content: "",
    });

    function handleChange(event) {
        var { name, value } = event.target;
        setInfo((preval) => ({
            ...preval,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        setInfo({
            name: "",
            mailId: "",
            content: "",
        });
        event.preventDefault();
    }

    const ref = useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, margin: "-100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="contact"
        >
            <div className="animated-text">
                <span>" Together </span>
                <span>We </span>
                <span>Become </span>
                <span>Stronger "</span>
            </div>
            <div className="contact-content">
                <div className="text-content">
                    <h1>Send A Message <span className="msg">✉️</span></h1>
                    <p>An email will be sent to the owner</p>
                </div>
                <div className="form-content">
                    <form onSubmit={handleSubmit}>
                        <input id="name" name="name" value={info.name} onChange={handleChange} placeholder="Full Name" autoComplete="off" autoFocus />
                        <input id="mailid" name="mailId" value={info.mailId} onChange={handleChange} placeholder="Email Id" autoComplete="off" />
                        <textarea id="content" name="content" value={info.content} onChange={handleChange} placeholder="Message" autoComplete="off" rows={5} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
            <h2 className="text">Stay connected! Reach out to us anytime at... </h2>
            <div style={{ display: "flex", justifyContent: "center", margin: "21px 0px" }}>
                <GoogleMap />
            </div>
            <div className="reviews">
                <h2>Your valuable feedback helps us improve... </h2>
                <div className="review-box">
                    <Reviews />
                </div>
            </div>
            <div className="social-media">
                <h2>Feel free to reach us on </h2>
                <div className="icons">
                
                <a href="https://www.linkedin.com/company/human-team-foundation/">
                    <LinkedInIcon fontSize="large" className="icon" />
                </a>
                <a href="https://www.instagram.com/humanteamfoundation/">
                    <InstagramIcon fontSize="large" className="icon" />
                </a>
                <a href="https://www.facebook.com/humanteamfoundation/">
                    <FacebookIcon fontSize="large" className="icon" />
                </a>
                </div>
            </div>
        </motion.div>
    );
}
