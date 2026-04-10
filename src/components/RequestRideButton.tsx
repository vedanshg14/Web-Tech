"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import LoginModal from "./LoginModal";

const RequestRideButton = ({ dark }: { dark?: boolean }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    pickUpLocation: "",
    destination: "",
    numberOfPassengers: "",
    preferredModeOfTravel: "",
    travelDate: "",
    travelTime: "", // Add this new field
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, `users/${user!.uid}/rides`), {
        ...formData,
        userId: user!.uid,
        userEmail: user!.email,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      alert("Ride request submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        pickUpLocation: "",
        destination: "",
        numberOfPassengers: "",
        preferredModeOfTravel: "",
        travelDate: "",
        travelTime: "" // Add this new field
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving ride request:", error);
      alert("Failed to submit ride request. Please try again.");
    }
  };

  const handleButtonClick = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Request Ride Button */}
      <button
        type="button"
        onClick={handleButtonClick}
        className={clsx(
          "flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit",
          dark
            ? "bg-foreground text-background hover:bg-foreground/90"
            : "bg-white text-foreground hover:bg-gray-100"
        )}
      >
        Request a Ride
      </button>

      {/* Modal */}
      {isOpen && user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">
              Request a Ride
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-2 border rounded-md text-black"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-2 border rounded-md text-black"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number (WhatsApp)"
                className="w-full p-2 border rounded-md text-black"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md text-black"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pickUpLocation"
                placeholder="Pick-up Location"
                className="w-full p-2 border rounded-md text-black"
                value={formData.pickUpLocation}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                className="w-full p-2 border rounded-md text-black"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="numberOfPassengers"
                placeholder="Number of Passengers"
                className="w-full p-2 border rounded-md text-black"
                value={formData.numberOfPassengers}
                onChange={handleInputChange}
                min="1"
                required
              />
              <select
                name="preferredModeOfTravel"
                className="w-full p-2 border rounded-md text-black"
                value={formData.preferredModeOfTravel}
                onChange={handleInputChange}
                required
              >
                <option value="">Preferred Mode of Travel</option>
                <option value="auto">Auto</option>
                <option value="cab-5">5-Seater Cab</option>
                <option value="cab-7">7-Seater Cab</option>
              </select>

              <input
                type="date"
                name="travelDate"
                className="w-full p-2 border rounded-md text-black"
                value={formData.travelDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <input
                type="time"
                name="travelTime"
                placeholder="Time of travelling"
                className="w-full p-2 border rounded-md text-black"
                value={formData.travelTime}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => setIsOpen(true)}
        />
      )}
    </>
  );
};

export default RequestRideButton;
