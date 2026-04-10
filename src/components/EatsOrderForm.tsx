// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import Toast from "./Toast";

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   restaurant: string;
//   time: string;
//   people: number;
//   date: string;
// }

// interface EatsOrderFormProps {
//   onSuccess?: () => void;
// }

// const EatsOrderForm: React.FC<EatsOrderFormProps> = ({ onSuccess }) => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     restaurant: "",
//     time: "",
//     people: "", 
//     date: "",
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Available days (only Saturday, Sunday, Monday)
//   const availableDays = ["Saturday", "Sunday", "Monday"];

//   // Generate time slots from 6:30 PM to 8:30 PM
//   const generateTimeSlots = () => {
//     const slots = [];
//     for (let hour = 18; hour < 20; hour++) {
//       const formattedHour = hour > 12 ? hour - 12 : hour;
//       slots.push(`${formattedHour}:30 PM`);
//       slots.push(`${formattedHour + 1}:00 PM`);
//     }
//     return slots;
//   };

//   const timeSlots = generateTimeSlots();

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: name === "people" ? parseInt(value) || "" : value, // Allow empty string
//     });

//     // Clear error when field is edited
//     if (errors[name as keyof FormData]) {
//       setErrors({
//         ...errors,
//         [name]: undefined,
//       });
//     }
//   };

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};

//     // Validate name
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }

//     // Validate email
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }

//     // Validate phone
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
//       newErrors.phone = "Invalid phone number (10 digits required)";
//     }

//     // Validate restaurant
//     if (!formData.restaurant.trim()) {
//       newErrors.restaurant = "Restaurant name is required";
//     }

//     // Validate time
//     if (!formData.time) {
//       newErrors.time = "Please select a time";
//     }

//     // Validate people (should be at least 5)
//     if (!formData.people || formData.people < 5) {
//       newErrors.people = "Minimum 5 people required";
//     }

//     // Validate date
//     if (!formData.date) {
//       newErrors.date = "Please select a date";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setIsSubmitting(true);

//       try {
//         // Add the form data to Firestore
//         const notesTextarea = document.getElementById(
//           "notes"
//         ) as HTMLTextAreaElement;
//         const notes = notesTextarea ? notesTextarea.value : "";

//         await addDoc(collection(db, "eatsOrders"), {
//           ...formData,
//           notes,
//           status: "pending", // Initial status
//           createdAt: serverTimestamp(),
//         });

//         // If onSuccess callback is provided, call it to close modal and show toast
//         if (onSuccess) {
//           onSuccess();
//         } else {
//           // Show success message in form if no callback provided
//           setShowSuccess(true);

//           // Reset form after 3 seconds
//           setTimeout(() => {
//             setFormData({
//               name: "",
//               email: "",
//               phone: "",
//               restaurant: "",
//               time: "",
//               people: 5,
//               date: "",
//             });
//             if (notesTextarea) notesTextarea.value = "";
//             setShowSuccess(false);
//           }, 3000);
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
//       {/* Form Header */}
//       <div className="bg-[#FFF8E1] dark:bg-gray-700 p-6 border-b-4 border-[#F5C33B]">
//         <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
//           Order with <span className="text-[#F5C33B]">Femtro Eats</span>
//         </h3>
//         <p className="text-gray-700 dark:text-gray-300 text-center mt-2">
//           Fill out the form below to place your group order
//         </p>
//       </div>

//       {/* Success Message */}
//       <Toast
//         message="Your order has been submitted successfully! We'll contact you shortly."
//         show={showSuccess}
//         onClose={() => setShowSuccess(false)}
//       />

//       {/* Form Body */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//         {/* Name Field */}
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Your Name *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               errors.name
//                 ? "border-red-500 dark:border-red-400"
//                 : "border-gray-300 dark:border-gray-600"
//             } focus:ring-2 focus:ring-[#F5C33B] focus:border-transparent dark:bg-gray-700 dark:text-white`}
//             placeholder="John Doe"
//           />
//           {errors.name && (
//             <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//               {errors.name}
//             </p>
//           )}
//         </div>

//         {/* Email Field */}
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Email Address *
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               errors.email
//                 ? "border-red-500 dark:border-red-400"
//                 : "border-gray-300 dark:border-gray-600"
//             } focus:ring-2 focus:ring-[#F5C33B] focus:border-transparent dark:bg-gray-700 dark:text-white`}
//             placeholder="john@example.com"
//           />
//           {errors.email && (
//             <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//               {errors.email}
//             </p>
//           )}
//         </div>

//         {/* Phone Field */}
//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Phone Number *
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               errors.phone
//                 ? "border-red-500 dark:border-red-400"
//                 : "border-gray-300 dark:border-gray-600"
//             } focus:ring-2 focus:ring-[#F5C33B] focus:border-transparent dark:bg-gray-700 dark:text-white`}
//             placeholder="10-digit phone number"
//           />
//           {errors.phone && (
//             <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
//           )}
//         </div>

//         {/* Restaurant Input */}
//         <div>
//           <label
//             htmlFor="restaurant"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Restaurant Name *
//           </label>
//           <input
//             type="text"
//             id="restaurant"
//             name="restaurant"
//             value={formData.restaurant}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               errors.restaurant
//                 ? "border-red-500"
//                 : "border-gray-300 dark:border-gray-600"
//             } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
//             placeholder="Type the restaurant name"
//           />
//           {errors.restaurant && (
//             <p className="mt-1 text-sm text-red-500">{errors.restaurant}</p>
//           )}
//         </div>

//         {/* Two columns for Time and People */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Time Selection */}
//           <div>
//             <label
//               htmlFor="time"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Preferred Time *
//             </label>
//             <select
//               id="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-lg border ${
//                 errors.time
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-600"
//               } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
//             >
//               <option value="">Select a time</option>
//               {timeSlots.map((time, index) => (
//                 <option key={index} value={time}>
//                   {time}
//                 </option>
//               ))}
//             </select>
//             {errors.time && (
//               <p className="mt-1 text-sm text-red-500">{errors.time}</p>
//             )}
//           </div>

//           {/* Number of People */}
//           <div>
//             <label
//               htmlFor="people"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//             >
//               Number of People * (min. 5)
//             </label>
//             <input
//               type="number"
//               id="people"
//               name="people"
//               value={formData.people}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-lg border ${
//                 errors.people
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-600"
//               } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
//             />
//             {errors.people && (
//               <p className="mt-1 text-sm text-red-500">{errors.people}</p>
//             )}
//           </div>
//         </div>

//         {/* Date Selection */}
//         <div>
//           <label
//             htmlFor="date"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Delivery Date * (Sat, Sun, Mon only)
//           </label>
//           <select
//             id="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 rounded-lg border ${
//               errors.date
//                 ? "border-red-500"
//                 : "border-gray-300 dark:border-gray-600"
//             } focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white`}
//           >
//             <option value="">Select a day</option>
//             {availableDays.map((day, index) => (
//               <option key={index} value={day}>
//                 {day}
//               </option>
//             ))}
//           </select>
//           {errors.date && (
//             <p className="mt-1 text-sm text-red-500">{errors.date}</p>
//           )}
//         </div>

//         {/* Additional Notes */}
//         <div>
//           <label
//             htmlFor="notes"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//           >
//             Additional Notes (Optional)
//           </label>
//           <textarea
//             id="notes"
//             name="notes"
//             rows={3}
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#F5C33B] dark:bg-gray-700 dark:text-white"
//             placeholder="Any special requests or instructions?"
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-4 px-6 rounded-full transition duration-300 shadow-lg flex items-center justify-center"
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Processing...
//               </>
//             ) : (
//               "Place Your Order"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EatsOrderForm;
