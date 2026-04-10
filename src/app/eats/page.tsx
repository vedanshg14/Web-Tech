// "use client";

// import { useState } from "react";
// import Container from "@/components/Container";
// import Section from "@/components/Section";
// import { Analytics } from "@vercel/analytics/react";
// import Link from "next/link";
// import EatsOrderModal from "@/components/EatsOrderModal";
// // Import Heroicons
// import {
//   Square3Stack3DIcon,
//   BoltIcon,
//   HeartIcon,
//   CakeIcon,
//   FireIcon,
//   UsersIcon,
//   CalendarIcon,
//   CurrencyRupeeIcon,
//   BuildingStorefrontIcon,
// } from "@heroicons/react/24/solid";

// const EatsPage: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Sample food categories
//   const foodCategories = [
//     {
//       name: "Group Meals",
//       icon: <Square3Stack3DIcon className="h-12 w-12 text-[#F5C33B]" />,
//     },
//     {
//       name: "Quick Bites",
//       icon: <BoltIcon className="h-12 w-12 text-[#F5C33B]" />,
//     },
//     {
//       name: "Healthy Options",
//       icon: <HeartIcon className="h-12 w-12 text-[#F5C33B]" />,
//     },
//     {
//       name: "Desserts",
//       icon: <CakeIcon className="h-12 w-12 text-[#F5C33B]" />,
//     },
//   ];

//   // Sample popular restaurants
//   // Updated popular restaurants with images
//   const popularRestaurants = [
//     {
//       name: "Dominos",
//       rating: "4.5",
//       deliveryTime: "20-30 min",
//       cuisine: "Pizza",
//       imageUrl: "/images/eats/dominos.jpg", // Updated image URL
//     },
//     {
//       name: "KFC",
//       rating: "4.3",
//       deliveryTime: "25-35 min",
//       cuisine: "Fast Food",
//       imageUrl: "/images/eats/KFC.webp", // Updated image URL
//     },
//     {
//       name: "Macdonalds",
//       rating: "4.2",
//       deliveryTime: "30-40 min",
//       cuisine: "Burgers",
//       imageUrl: "/images/eats/macd.jpg", // Updated image URL
//     },
//     {
//       name: "Subway",
//       rating: "4.4",
//       deliveryTime: "20-30 min",
//       cuisine: "Sandwiches",
//       imageUrl: "/images/eats/Subway.jpg", // Updated image URL
//     },
//   ];

//   return (
//     <>
//       <div className="bg-gradient-to-b from-[#FFF8E1] to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-10">
//         <Container>
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="md:w-1/2">
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
//                 Group Food Delivery{" "}
//                 <span className="text-[#F5C33B]">Made Easy</span>
//               </h1>
//               <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
//                 Delicious meals delivered to your group. Perfect for study
//                 sessions, meetings, and hangouts.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   onClick={openModal}
//                   className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block text-center"
//                 >
//                   Order Now
//                 </button>
//                 <a
//                   href="#how-it-works"
//                   className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-[#F5C33B] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 inline-block text-center"
//                 >
//                   How It Works
//                 </a>
//               </div>
//             </div>
//             <div className="md:w-1/2 relative h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
//               <div className="absolute inset-0 bg-gradient-to-r from-[#F5C33B]/30 to-transparent z-10"></div>
//               <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
//                 <div className="flex space-x-4">
//                   <FireIcon className="h-16 w-16 text-[#F5C33B]" />
//                   <BoltIcon className="h-16 w-16 text-[#F5C33B]" />
//                   <HeartIcon className="h-16 w-16 text-[#F5C33B]" />
//                 </div>
//                 <p className="absolute bottom-4 right-4 bg-[#F5C33B] text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg z-20">
//                   Group Discounts!
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>

//       <Container>
//         <div className="py-12">
//           {/* Food Categories */}
//           <div className="mb-16">
//             <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
//               What are you{" "}
//               <span className="text-[#F5C33B]">craving today?</span>
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {foodCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center cursor-pointer hover:scale-105"
//                 >
//                   <div className="flex justify-center mb-4">
//                     {category.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     {category.name}
//                   </h3>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* How It Works */}
//           <Section
//             id="how-it-works"
//             title="How Femtro Eats Works"
//             description="Simple, Fast, and Convenient"
//           >
//             <div className="grid md:grid-cols-3 gap-8 mt-8">
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
//                 <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
//                   <span className="text-3xl font-bold text-[#F5C33B]">1</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
//                   Gather Your Group
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Get at least 5 people together for your order. Perfect for
//                   study groups, club meetings, or just hanging out with friends.
//                 </p>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
//                 <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
//                   <span className="text-3xl font-bold text-[#F5C33B]">2</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
//                   Place Your Order
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Choose from your favorite restaurants and place your orders.
//                   We'll coordinate the pickup and delivery for you.
//                 </p>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-t-4 border-[#F5C33B]">
//                 <div className="w-16 h-16 bg-[#F5C33B]/20 rounded-full flex items-center justify-center mb-4">
//                   <span className="text-3xl font-bold text-[#F5C33B]">3</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
//                   Enjoy Together
//                 </h3>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   We'll deliver all the food to your location at once. Just pay
//                   ₹100 per person for delivery and enjoy your meal together!
//                 </p>
//               </div>
//             </div>
//           </Section>

//           {/* Popular Restaurants */}
//           <div className="mt-16">
//             <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
//               Popular <span className="text-[#F5C33B]">Restaurants</span>
//             </h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {popularRestaurants.map((restaurant, index) => (
//                 <div
//                   key={index}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="h-40 bg-gray-200 dark:bg-gray-700 relative">
//                     <img
//                       src={restaurant.imageUrl}
//                       alt={restaurant.name}
//                       className="absolute inset-0 w-full h-full object-cover"
//                     />
//                     <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-[#F5C33B] px-2 py-1 rounded-lg font-bold shadow-sm">
//                       ★ {restaurant.rating}
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
//                       {restaurant.name}
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
//                       {restaurant.cuisine}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm text-gray-700 dark:text-gray-300">
//                         {restaurant.deliveryTime}
//                       </span>
//                       <button className="text-[#F5C33B] hover:text-[#E6B42C] font-medium text-sm">
//                         View Menu
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Service Details */}
//           <div className="mt-16 bg-[#FFF8E1] dark:bg-gray-800/50 rounded-2xl p-8 shadow-lg">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//               Service Details
//             </h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
//                   <UsersIcon className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Minimum 5 People
//                   </h4>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     Our group food delivery service requires a minimum of 5
//                     people per order.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
//                   <CalendarIcon className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Weekend Service
//                   </h4>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     Available on weekends and Saturdays for your convenience.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start">
//                 <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F5C33B] flex items-center justify-center mt-1">
//                   <CurrencyRupeeIcon className="h-5 w-5 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Delivery Charge
//                   </h4>
//                   <p className="text-gray-700 dark:text-gray-300">
//                     ₹100 per person for food delivery, with no hidden fees.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Call to Action */}
//           <div className="mt-16 text-center">
//             <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
//               Ready to Order with{" "}
//               <span className="text-[#F5C33B]">Femtro Eats</span>?
//             </h2>
//             <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
//               Gather your group, choose your favorite food, and let us handle
//               the rest!
//             </p>
//             <button
//               onClick={openModal}
//               className="bg-[#F5C33B] hover:bg-[#E6B42C] text-gray-900 font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg inline-block text-center text-lg"
//             >
//               Order Now
//             </button>
//           </div>
//         </div>
//         <Analytics />
//       </Container>

//       {/* Order Modal */}
//       <EatsOrderModal isOpen={isModalOpen} onClose={closeModal} />
//     </>
//   );
// };

// export default EatsPage;


"use client";

import EatsApology from "@/components/EatsApology";

const EatsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <EatsApology />
    </div>
  );
};

export default EatsPage;