// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import EatsOrderForm from "./EatsOrderForm";
// import Toast from "./Toast";

// interface EatsOrderModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const EatsOrderModal: React.FC<EatsOrderModalProps> = ({ isOpen, onClose }) => {
//   const [mounted, setMounted] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // Prevent scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   if (!mounted) return null;

//   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleFormSuccess = () => {
//     onClose();
//     setShowToast(true);
//   };

//   const modalContent = isOpen ? (
//     <div
//       className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all hide-scrollbar">
//         {/* Close button positioned absolutely on top right */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-20 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
//           aria-label="Close"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Form without extra container */}
//         <EatsOrderForm onSuccess={handleFormSuccess} />
//       </div>
//     </div>
//   ) : null;

//   return (
//     <>
//       {createPortal(modalContent, document.body)}
//       <Toast
//         message="Your order has been submitted successfully! We'll contact you shortly."
//         show={showToast}
//         onClose={() => setShowToast(false)}
//         type="success"
//       />
//     </>
//   );
// };

// export default EatsOrderModal;
