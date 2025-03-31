"use client";

import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import type { CSSProperties } from "react";

const location: google.maps.LatLngLiteral = {
  lat: 19.053780291254967,
  lng: 72.88590719999999,
};

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
};

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSluPUHLbfx_TsmKJEcpAddTjMKjr1Dw0", // Replace with your API key
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location} // Set map center to hardcoded location
      zoom={15} // Zoom level to get a good view of the location
      onLoad={() => setMapLoaded(true)}
    >
      {mapLoaded && <Marker position={location} />}{" "}
      {/* Place a marker at the location */}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
