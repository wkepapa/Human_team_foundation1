"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

// Theme state to detect system preference
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>("light");

  // Listen for changes in theme (light/dark) preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Set initial theme based on user preference
    setTheme(mediaQuery.matches ? "dark" : "light");

    // Add event listener to detect theme changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener when component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className={`absolute inset-0 h-full w-full ${
                  theme === "dark" ? "bg-slate-600/[0.8]" : "bg-blue-200"
                } block rounded-3xl`}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card theme={theme}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  theme,
}: {
  className?: string;
  children: React.ReactNode;
  theme: string;
}) => {
  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full p-4 overflow-hidden ${
          theme === "dark"
            ? "bg-slate-800 border border-gray-600 group-hover:bg-slate-700 group-hover:border-gray-400"
            : "bg-blue-50 border border-transparent group-hover:bg-blue-50 group-hover:border-white"
        } relative z-20`,
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "font-bold tracking-wide mt-4 text-3xl text-center",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-gray-500 tracking-wide leading-relaxed text-lg text-center",
        className
      )}
    >
      {children}
    </p>
  );
};
