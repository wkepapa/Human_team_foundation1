"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center ">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-3xl mx-auto z-50 bg-black text-white rounded-full flex items-center px-6 py-3 shadow-lg",
        className
      )}
    >
      <Image
        src="/images/pic1.jpg"
        alt="Logo"
        width={40}
        height={40}
        className="rounded-full hover:scale-110 transition-transform duration-300"
      />
      <nav className="flex space-x-6 flex-grow justify-center">
        <button
          onClick={() => router.push("/")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition-transform duration-300 px-3 py-1 rounded-md"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/ContactUs")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition-transform duration-300 px-3 py-1 rounded-md"
        >
          Contact Us
        </button>
        <button
          onClick={() => router.push("/Donation")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition-transform duration-300 px-3 py-1 rounded-md"
        >
          Donation
        </button>
        <button
          onClick={() => router.push("/Volunteer")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition-transform duration-300 px-3 py-1 rounded-md"
        >
          Volunteer Registration
        </button>
        <button
          onClick={() => router.push("/Admin")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition-transform duration-300 px-3 py-1 rounded-md"
        >
          Admin
        </button>
      </nav>
    </div>
  );
}
