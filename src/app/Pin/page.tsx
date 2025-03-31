"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import GoogleMapComponent from "../Googlemap/page";
export function AnimatedPinDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <PinContainer
        title="HUMAN TEAM FOUNDATION"
        href="https://maps.app.goo.gl/tLj6GosCtbF7i6jf9?g_st=iw"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          {/* Google Map Component inside PinContainer */}
          <GoogleMapComponent />
        </div>
      </PinContainer>
    </div>
  );
}
