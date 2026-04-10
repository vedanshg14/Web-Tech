"use client";
import Image from "next/image";
import femtroImage from "../../public/images/eats/FEMTRO RIDES PRIVATE LIMITED_page-0001.jpg";

interface EatsApologyProps {
  onDismiss?: () => void;
}

const EatsApology: React.FC<EatsApologyProps> = ({ onDismiss }) => {
  // Open the Google form in a new tab
  const openGoogleForm = () => {
    window.open("https://forms.gle/URab17ayjDpzm13cA", "_blank");
  };

  return (
    <div
      className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 min-h-screen"
      style={{ paddingTop: "90px", paddingBottom: "25px" }} // Added paddingBottom
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden relative z-10">
        {/* Image Container */}
        <div className="w-full">
          <div className="relative w-full h-[600px]">
            {" "}
            {/* Increased image size */}
            <Image
              src={femtroImage}
              alt="FEMTRO RIDES"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Button Container */}
        <div className="p-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 w-full flex flex-col items-center justify-center space-y-1 shadow-md"
            onClick={openGoogleForm}
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm0 6h6v2H7v-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">Your feedback is important</span>
            </div>
            <span className="text-xs text-gray-200">
              Click this button to give your feedback
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EatsApology;

// hello
