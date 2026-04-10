import React from 'react';
import Link from 'next/link';

interface TermsModalProps {
  onAccept: () => void;
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onAccept, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
        <p className="mb-4">
          By signing in with Google, you agree to our{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms and Conditions
          </Link>
          .
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;