"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 bg-black text-white rounded-full flex items-center justify-center p-4 py-7",
        className
      )}
    >
      <nav className="flex space-x-8">
        <button
          onClick={() => router.push("/")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition duration-200"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/ContactUs")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition duration-200"
        >
          Contact Us
        </button>
        <button
          onClick={() => router.push("/Donation")}
          className="focus:outline-none hover:text-gray-400 hover:scale-105 transition duration-200"
        >
          Donation
        </button>
      </nav>
    </div>
  );
}
