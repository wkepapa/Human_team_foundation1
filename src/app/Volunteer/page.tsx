"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { NavbarDemo } from "../Navbar/page";
import axiosInstance from "@/utils/axios";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function VolunteerSignupForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      skills: (form.elements.namedItem("skills") as HTMLInputElement).value,
    };

    try {
      const response = await axiosInstance.post("/volunteers", formData);
      console.log("Volunteer submitted:", response.data);
      alert("Thanks for signing up!");
      form.reset();
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black my-20">
        <NavbarDemo />
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Volunteer Registration
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Join us in making a difference! Fill out the form below to volunteer.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Shivam" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="shivam7@example.com"
              type="email"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1234567890" type="tel" required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              placeholder="Teaching, Organizing, Fundraising..."
              type="text"
              required
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign Up
            <BottomGradient />
          </button>
        </form>
      </div>
      <footer className="dark:bg-gray-950 bg-gray-100 dark:text-white text-gray-700 text-center py-6 mt-12 w-full transition-all duration-300">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-pink-600 hover:text-pink-800">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Human Team Foundation. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
