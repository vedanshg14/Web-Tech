"use client";

import { IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import { frequentlyTravelledRoutes } from "./Routes";

interface RouteData {
  id: number;
  title: string;
  button: string;
  src: string;
  distance: string;
  travelTime: string;
  options: { type: string; fare: string }[];
}

// Transform the route data to match the RouteData interface
const transformedRoutes = frequentlyTravelledRoutes.map((route) => ({
  id: route.id,
  title: route.title,
  button: route.button,
  src: route.src,
  distance: route.details.distance,
  travelTime: route.details.estimatedTime,
  options: route.details.options,
}));

interface SlideProps {
  route: RouteData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  openDetails: (route: RouteData) => void;
}

const Slide = ({
  route,
  index,
  current,
  handleSlideClick,
  openDetails,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out">
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            src={route.src}
            alt={route.title}
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold">
            {route.title}
          </h2>
          <div className="flex justify-center">
            <button
              className="mt-6 px-4 py-2 text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                openDetails(route);
              }}
            >
              {route.button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

export function Carousel() {
  const [current, setCurrent] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  if (!transformedRoutes || transformedRoutes.length === 0) {
    return <p className="text-center text-gray-500">No routes available.</p>;
  }

  const handlePreviousClick = () =>
    setCurrent((prev) =>
      prev === 0 ? transformedRoutes.length - 1 : prev - 1
    );
  const handleNextClick = () =>
    setCurrent((prev) =>
      prev === transformedRoutes.length - 1 ? 0 : prev + 1
    );
  const handleSlideClick = (index: number) => setCurrent(index);
  const openDetails = (route: RouteData) => setSelectedRoute(route);
  const closeDetails = () => setSelectedRoute(null);

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto">
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${
            current * (100 / transformedRoutes.length)
          }%)`,
        }}
      >
        {transformedRoutes.map((route, index) => (
          <Slide
            key={index}
            route={route}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
            openDetails={openDetails}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)] space-x-4">
        <button
          className="w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full transition duration-200"
          onClick={handlePreviousClick}
        >
          <IconArrowNarrowRight className="rotate-180 text-neutral-600 dark:text-neutral-200" />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full transition duration-200"
          onClick={handleNextClick}
        >
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
      </div>

      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={closeDetails}
            >
              <IconX size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-2">
              {selectedRoute.title}
            </h2>
            <p className="text-gray-600">Distance: {selectedRoute.distance}</p>
            <p className="text-gray-600">
              Estimated Time: {selectedRoute.travelTime}
            </p>
            <h3 className="text-lg font-semibold mt-4">Available Options:</h3>
            <ul className="mt-2">
              {selectedRoute.options?.length > 0 ? (
                selectedRoute.options.map((option, idx) => (
                  <li key={idx} className="text-gray-700">
                    {option.type}: <strong>{option.fare}</strong>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No options available</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
