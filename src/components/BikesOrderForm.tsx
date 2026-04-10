"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  numberOfVehicles: number;
  date: string;
  time: string;
}

interface BikesOrderFormProps {
  onSuccess?: () => void;
}

const BikesOrderForm: React.FC<BikesOrderFormProps> = ({ onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    numberOfVehicles: 1,
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Vehicle type options
  const vehicleOptions = ["Scooty", "Bike"];

  // Generate time slots from 8 AM to 8 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      slots.push(`${formattedHour}:00 ${period}`);
      if (hour < 20) {
        slots.push(`${formattedHour}:30 ${period}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // For number of vehicles, ensure it's at least 1
    if (name === "numberOfVehicles") {
      const vehicleCount = parseInt(value);
      setFormData({
        ...formData,
        [name]: vehicleCount < 1 ? 1 : vehicleCount,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Invalid phone number (10 digits required)";
    }

    // Validate vehicle type
    if (!formData.vehicleType) {
      newErrors.vehicleType = "Please select a vehicle type";
    }

    // Validate number of vehicles
    if (!formData.numberOfVehicles || formData.numberOfVehicles < 1) {
      newErrors.numberOfVehicles = "At least 1 vehicle is required";
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = "Please select a time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Add the form data to Firestore
        const notesTextarea = document.getElementById(
          "notes"
        ) as HTMLTextAreaElement;
        const notes = notesTextarea ? notesTextarea.value : "";

        await addDoc(collection(db, "bikesOrders"), {
          ...formData,
          notes,
          status: "pending", // Initial status
          createdAt: serverTimestamp(),
        });

        // If onSuccess callback is provided, call it to close modal and show toast
        if (onSuccess) {
          onSuccess();
        } else {
          // Show success message in form if no callback provided
          setShowSuccess(true);

          // Reset form after 3 seconds
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              vehicleType: "",
              numberOfVehicles: 1,
              date: "",
              time: "",
            });
            if (notesTextarea) notesTextarea.value = "";
            setShowSuccess(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
      {/* Form Header */}
      <div className="bg-[#FFF8E1] dark:bg-gray-700 p-6 border-b-4 border-[#F5C33B]">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Rent with <span className="text-[#F5C33B]">Femtro Bikes</span>
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-center mt-2">
          Fill out the form below to rent your vehicle
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-100 dark:bg-green-800 p-4 m-6 rounded-lg">
          <p className="text-green-700 dark:text-green-200 text-center font-medium">
            Your rental request has been submitted successfully! We'll contact
            you shortly.
          </p>
        </div>
      )}

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
            placeholder="10-digit phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Vehicle Type Selection */}
        <div>
          <label
            htmlFor="vehicleType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Vehicle Type *
          </label>
          <select
            id="vehicleType"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.vehicleType
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select a vehicle type</option>
            {vehicleOptions.map((vehicle, index) => (
              <option key={index} value={vehicle}>
                {vehicle}
              </option>
            ))}
          </select>
          {errors.vehicleType && (
            <p className="mt-1 text-sm text-red-500">{errors.vehicleType}</p>
          )}
        </div>

        {/* Two columns for Number of Vehicles and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Number of Vehicles */}
          <div>
            <label
              htmlFor="numberOfVehicles"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Number of Vehicles *
            </label>
            <input
              type="number"
              id="numberOfVehicles"
              name="numberOfVehicles"
              min="1"
              value={formData.numberOfVehicles}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.numberOfVehicles
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
            />
            {errors.numberOfVehicles && (
              <p className="mt-1 text-sm text-red-500">
                {errors.numberOfVehicles}
              </p>
            )}
          </div>

          {/* Date Selection */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Rental Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.date
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Pickup Time *
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.time
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">{errors.time}</p>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white"
            placeholder="Any special requirements or additional information"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold transition duration-300 shadow-lg ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Rental Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BikesOrderForm;
