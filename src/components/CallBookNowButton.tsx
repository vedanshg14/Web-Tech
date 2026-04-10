"use client";

import React, { useState } from 'react';
import clsx from 'clsx';

const CallBookNowButton = ({ dark }: { dark?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={clsx(
                    "flex items-center justify-center min-w-[205px] mt-3 px-6 h-14 rounded-full w-full sm:w-fit",
                    dark
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-white text-foreground hover:bg-gray-100"
                )}
            >
                Call & Book Now
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                        <h2 className="text-lg font-semibold">Book Your Ride</h2>
                        <p className="mt-2 text-gray-700">Call this number to book a ride:</p>
                        <p className="mt-2 text-xl font-bold text-blue-600">+91 9963594189</p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <a href="tel:+91 9963594189" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Call Now
                            </a>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CallBookNowButton;
