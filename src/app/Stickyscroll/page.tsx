"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";

const content = [
  {
    title: "4 July, 2020 ",
    description:
      " Small efforts put in by @humanteamfoundation to help unprivileged during pandemic.Lightly and gradually, we all will come out of this and fight this together.We pledge to help as many as possible by feeding or by giving ration within our limits.Thankyou so much everyone and others for reaching out to us, joining us in this time and help unconditionally.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/pandemic.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Sep 19, 2022",
    description:
      "As a part of our Human Team Foundation (HTF) activity, the college student from (@vbs.mumbai @vesim.mba )Vivekanand Education Society (VES) encouraged us to take up beach cleanup drives as an initiative to save Marine life. Our Secondary learners as well as learners of college student took this initiative seriously and enthusiastically and visited Dadar Chowpatty beach, Dadar for this purpose. We begin this journey on Sep 19, 2022.We as a group felt content that we could make a small yet impactful contribution towards nature and its inhabitants. We aim to take this initiative further and create awareness among our families and societies so that we all can contribute in keeping our beaches and water bodies clean and not pollute it by throwing plastic and debris into the them.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/images/beach_clean.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },

  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Running out of content
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <h1 className="text-center mt-20 font-bold text-6xl">Past Events</h1>
      <StickyScroll content={content} />
    </div>
  );
}
