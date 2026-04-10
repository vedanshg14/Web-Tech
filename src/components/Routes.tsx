"use client";

import React, { useState } from "react"; // ✅ Explicitly import React
import dynamic from "next/dynamic";

const Carousel = dynamic(
  () => import("@/components/Carousel").then((mod) => mod.Carousel),
  {
    ssr: false, // ✅ Prevents server-side rendering issues
  }
);



// Define the route data structure that matches both components
export interface RouteDataDetails {
  id: number;
  title: string;
  button: string;
  src: string;
  details: {
    distance: string;
    estimatedTime: string;
    options: { type: string; fare: string }[];
  };
}

export const frequentlyTravelledRoutes: RouteDataDetails[] = [
  {
    id: 1,
    title: "VIT-AP to PVP Square Mall",
    button: "View Details",
    src: "/images/PVP.jpg",
    details: {
      distance: "18 km",
      estimatedTime: "30 min",
      options: [
        { type: "4 Persons", fare: "₹660" },
        { type: "6-7 Persons", fare: "₹770" },
        { type: "10 Persons", fare: "₹990" },
      ],
    },
  },
  {
    id: 2,
    title: "VIT-AP to Vijayawada Railway Station",
    button: "View Details",
    src: "/images/Station.jpg",
    details: {
      distance: "12 km",
      estimatedTime: "25 min",
      options: [
        { type: "1-2 Persons", fare: "₹440" },
        { type: "6 Persons", fare: "₹660" },
        { type: "10 Persons", fare: "₹990" },
      ],
    },
  },
  {
    id: 3,
    title: "VIT-AP to Vijayawada International Airport",
    button: "View Details",
    src: "/images/Airport.jpg",
    details: {
      distance: "15 km",
      estimatedTime: "28 min",
      options: [
        { type: "1-2 Persons", fare: "₹990" },
        { type: "5-6 Persons", fare: "₹1540" },
      ],
    },
  },
];

const Routes = () => {
  const [selectedRoute, setSelectedRoute] = useState<RouteDataDetails | null>(
    null
  );

  return (
    <section className="w-full flex flex-col items-center overflow-x-clip">
      <h2 className="text-2xl font-bold mb-4">Frequently Travelled Routes</h2>
      <Carousel />

      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-bold">{selectedRoute.title}</h3>
            <p>📍 Distance: {selectedRoute.details.distance}</p>
            <p>⏳ Estimated Time: {selectedRoute.details.estimatedTime}</p>
            <h4 className="font-semibold mt-2">Available Options:</h4>
            <ul>
              {selectedRoute.details.options.map((option, index) => (
                <li key={index}>
                  🚖 {option.type} - <strong>{option.fare}</strong>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedRoute(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Routes;

// hello