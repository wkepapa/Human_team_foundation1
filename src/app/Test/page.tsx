"use client";
export default function TestImage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img
        src="/images/pic7.jpg"
        alt="test"
        width={300}
        height={300}
        className="border border-red-500"
      />
    </div>
  );
}
