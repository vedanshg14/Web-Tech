"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
  type?: "success" | "error" | "info";
}

const Toast: React.FC<ToastProps> = ({
  message,
  show,
  onClose,
  duration = 3000,
  type = "success",
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor =
    type === "success"
      ? "bg-green-100 dark:bg-green-800"
      : type === "error"
      ? "bg-red-100 dark:bg-red-800"
      : "bg-blue-100 dark:bg-blue-800";

  const textColor =
    type === "success"
      ? "text-green-700 dark:text-green-200"
      : type === "error"
      ? "text-red-700 dark:text-red-200"
      : "text-blue-700 dark:text-blue-200";

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
      <div
        className={`${bgColor} p-4 rounded-lg shadow-lg max-w-md transform transition-all duration-300 flex items-center justify-between`}
      >
        <p className={`${textColor} font-medium`}>{message}</p>
        <button
          onClick={onClose}
          className={`ml-4 ${textColor} hover:text-opacity-75`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
