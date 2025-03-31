"use client";
import { div } from "framer-motion/client";
import { NavbarDemo } from "../Navbar/page";
import GoogleMapComponent from "../Googlemap/page";
import { AnimatedPinDemo } from "../Pin/page";

export default function ContactUs() {
  return (
    <div className="  h-screen ">
      <NavbarDemo />
      <AnimatedPinDemo />
      <div className="my-24">
        <GoogleMapComponent />
      </div>
    </div>
  );
}
