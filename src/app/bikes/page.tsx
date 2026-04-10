"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import BikesOrderModal from "@/components/BikesOrderModal";
// Import Heroicons
import {
  TruckIcon,
  BoltIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid";

const BikesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Sample bike categories
  const bikeCategories = [
    {
      name: "Scooties",
      icon: <TruckIcon className="h-12 w-12 text-[#F5C33B]" />,
    },
    {
      name: "Bikes",
      icon: <BoltIcon className="h-12 w-12 text-[#F5C33B]" />,
    },
    {
      name: "Daily Rentals",
      icon: <ClockIcon className="h-12 w-12 text-[#F5C33B]" />,
    },
    {
      name: "Weekly Rentals",
      icon: <CalendarIcon className="h-12 w-12 text-[#F5C33B]" />,
    },
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-[#FFF8E1] to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-10">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Bike Rentals <span className="text-[#F5C33B]">Made Easy</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                Convenient and affordable bike rentals for students. Perfect for
                commuting, errands, and exploring the city.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openModal}
                  className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block text-center"
                >
                  Rent Now
                </button>
                <a
                  href="#how-it-works"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-[#F5C33B] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 inline-block text-center"
                >
                  How It Works
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5C33B]/30 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className="flex space-x-4">
                  <FireIcon className="h-16 w-16 text-[#F5C33B]" />
                  <BoltIcon className="h-16 w-16 text-[#F5C33B]" />
                  <HeartIcon className="h-16 w-16 text-[#F5C33B]" />
                </div>
                <p className="absolute bottom-4 right-4 bg-[#F5C33B] text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg z-20">
                  Student Discounts!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-12">
          {/* Bike Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              What type of vehicle do you{" "}
              <span className="text-[#F5C33B]">need?</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bikeCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center cursor-pointer hover:scale-105"
                >
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <Section
            id="how-it-works"
            title="How Femtro Bikes Works"
            description="Simple, Fast, and Convenient"
          >
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Choose Your Vehicle
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Select between a scooty or bike based on your preference and
                  needs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Book Your Rental
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Fill out the simple form with your details, select the number
                  of vehicles, and choose your rental date and time.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
                <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-[#F5C33B]">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  Ride Away
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Pick up your vehicle at the scheduled time and enjoy your ride
                  with our well-maintained vehicles.
                </p>
              </div>
            </div>
          </Section>

          {/* Service Details */}
          <div className="mt-16 bg-[#FFF8E1] dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Service Details
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
                  <UsersIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Student Discounts
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Special rates for students with valid ID cards.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
                  <CalendarIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Flexible Rentals
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Daily, weekly, and monthly rental options available.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
                  <CurrencyRupeeIcon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Affordable Rates
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Competitive pricing with no hidden fees.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Rent with{" "}
              <span className="text-[#F5C33B]">Femtro Bikes</span>?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get around campus and the city with ease. Book your bike or scooty
              now!
            </p>
            <button
              onClick={openModal}
              className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg inline-block text-center text-lg"
            >
              Rent Now
            </button>
          </div>
        </div>
      </Container>

      {/* Order Modal */}
      <BikesOrderModal isOpen={isModalOpen} onClose={closeModal} />
      <Analytics />
    </>
  );
};

export default BikesPage;
