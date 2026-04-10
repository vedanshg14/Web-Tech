"use client";
import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Poppins, Varela_Round } from "next/font/google";

// Initialize the fonts
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const StudentOfferButton = () => {
  // Set initial state to true to show modal on load
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Optional: You can use this effect if you need to do anything else on initial load
  useEffect(() => {
    // Any additional logic for when the modal shows on initial load
    // For example, you might want to set a cookie to prevent showing it on every visit
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Floating Action Button with elegant boundary glow */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-secondary blur-md opacity-70 animate-pulse"></div>
        <button
          onClick={openModal}
          className={`relative px-5 py-3 rounded-full bg-secondary text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 ${poppins.className} font-bold text-sm border border-white/20`}
          aria-label="Student Offer"
        >
          VITOPIA 2025
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all ${varelaRound.className}`}>
            {/* Modal Header with gradient background */}
            <div className="bg-gradient-to-r from-secondary to-blue-700 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-bold ${poppins.className}`}>Special Offer!</h3>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <FaGraduationCap size={40} className="text-secondary mr-3" />
                <h4 className={`text-xl font-semibold ${poppins.className}`}>
                  VITOPIA & VITAP Students
                </h4>
              </div>

              <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className={`text-center text-lg font-bold ${poppins.className}`}>
                  <span className="text-3xl text-primary">0%</span> Commission
                </p>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  For all student registrations
                </p>
              </div>

              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We're committed to supporting students! Register with your
                student ID and enjoy zero commission rides with Femtro.
              </p>

              <div className="flex justify-center">
                <button
                  className={`bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ${poppins.className}`}
                  onClick={() => {
                    // Add registration logic or redirect here
                    window.location.href = "#cta";
                    closeModal();
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentOfferButton;
