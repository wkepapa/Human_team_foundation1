"use client";
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

export function BackgroundGradientDemo({ title, description, image }) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 h-[500px] flex flex-col justify-between">
        <div className="h-64 w-full">
          <Image
            src={image}
            alt={title}
            layout="responsive"
            width={300}
            height={150}
            className="object-cover rounded-lg h-full"
          />
        </div>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <button className="rounded-full px-8 py-4 text-white flex items-center justify-center bg-black mt-4 text-base font-bold dark:bg-zinc-800 shadow-lg hover:bg-gray-600 transition-all">
          <span>Donate Now</span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
