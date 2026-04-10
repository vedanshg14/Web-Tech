"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";
import { FaMoon, FaSun } from "react-icons/fa";
import Image from "next/image";

import Container from "./Container";
import { siteDetails } from "@/data/siteDetails";
import { menuItems } from "@/data/menuItems";
import { useTheme } from "@/components/ThemeContext";
import { useAuth } from "@/components/AuthContext";
import LoginButton from "@/components/LoginButton";
import UserMenu from "@/components/UserMenu";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loginFunction, setLoginFunction] = useState<
    (() => Promise<void>) | null
  >(null);
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle login click with Google sign-in function
  const handleLoginClick = (signInFunction: () => Promise<void>) => {
    setLoginFunction(() => signInFunction); // Store the login function
    setShowTermsModal(true);
  };

  // Handle terms acceptance and trigger Google sign-in
  const handleAcceptTerms = async () => {
    setShowTermsModal(false);
    if (loginFunction) {
      await loginFunction(); // Execute the stored login function
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-white shadow-sm dark:bg-[#0d0d0d]`}
    >
      <Container className="!px-0 w-full mx-auto">
        {" "}
        {/* Increased max-width for larger screens */}
        <nav className="mx-auto flex justify-between items-center py-2 px-5 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 -mt-2">
            <Image
              src={
                theme === "dark"
                  ? "/images/femtro-dark.png"
                  : "/images/femtro.png"
              }
              alt={`${siteDetails.siteName} Logo`}
              width={120}
              height={40}
              className="min-w-fit"
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <HiOutlineXMark className="h-6 w-6" />
              ) : (
                <HiBars3 className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
            {/* Authentication UI */}
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}

            <li>
              {loading ? (
                <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <LoginButton onClick={handleLoginClick} />
              )}
            </li>

            {/* Show Call & Book Now button only when user is logged in */}
            {user && (
              <li>
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors"
                >
                  Call & Book Now
                </button>
              </li>
            )}

            {/* Light/Dark Mode Toggle Button */}
            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === "light" ? (
                  <FaMoon className="text-gray-800 dark:text-white" />
                ) : (
                  <FaSun className="text-gray-800 dark:text-white" />
                )}
              </button>
            </li>
          </ul>
        </nav>
        {/* Mobile Menu */}
        <Transition
          show={isMobileMenuOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden bg-white dark:bg-[#0d0d0d] shadow-lg rounded-b-lg">
            <div className="px-4 pt-2 pb-4 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.url}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}

              <div className="flex items-center justify-between px-3 py-2">
                <div>
                  {loading ? (
                    <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  ) : user ? (
                    <UserMenu />
                  ) : (
                    <LoginButton onClick={handleLoginClick} />
                  )}
                </div>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === "light" ? (
                    <FaMoon className="text-gray-800 dark:text-white" />
                  ) : (
                    <FaSun className="text-gray-800 dark:text-white" />
                  )}
                </button>
              </div>

              {user && (
                <div className="px-3 py-2">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-black bg-primary hover:bg-primary-accent px-4 py-2 rounded-full transition-colors text-center"
                  >
                    Call & Book Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </Transition>
      </Container>

      {/* Popup for Call & Book Now Button */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold">Book Your Ride</h2>
            <p className="mt-2 text-gray-700">
              Call this number to book a ride:
            </p>
            <p className="mt-2 text-xl font-bold text-blue-600">
              +91 9963594189
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="tel:+91 9963594189"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
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

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              Terms and Conditions for Femtro Rides Pvt Ltd
            </h2>
            <div className="mb-4 text-gray-700 dark:text-gray-300 text-sm space-y-4">
              <section>
                <h3 className="font-semibold text-base mb-2">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing or using the services provided by Femtro Rides
                  Pvt Ltd, including but not limited to booking rides via our
                  website, mobile application, or phone collectively, the
                  Platform, you agree to be bound by these Terms and Conditions.
                  If you do not accept these Terms in full, you must immediately
                  cease using the Platform.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  2. Nature of Services
                </h3>
                <p>
                  Femtro operates as a technology-driven Software-as-a-Service
                  (SaaS) platform that connects Users with third-party auto
                  rickshaw drivers. Femtro does not:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Own, operate, or control any vehicles.</li>
                  <li>Employ, train, or supervise Drivers.</li>
                  <li>
                    Guarantee the safety, conduct, or quality of services
                    provided by Drivers.
                  </li>
                </ul>
                <p className="mt-2">
                  Drivers are independent contractors solely responsible for
                  their vehicles, licenses, insurance, and compliance with
                  applicable laws.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  3. User Responsibilities
                </h3>
                <p>You agree to:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Verify the identity and credentials of the Driver before
                    commencing any ride.
                  </li>
                  <li>Use the Platform at your own risk.</li>
                  <li>
                    Accept full liability for any disputes, injuries, losses,
                    damages, or legal issues arising during or related to your
                    ride.
                  </li>
                  <li>Comply with all applicable laws and regulations.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  4. Liability Disclaimer
                </h3>
                <h4 className="font-medium mb-1">
                  4.1 Femtro Rides Pvt Ltd's Liability
                </h4>
                <p>
                  Femtro acts solely as an intermediary between Users and
                  Drivers. Under no circumstances shall Femtro be liable for:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Accidents, delays, misconduct, or negligence by Drivers.
                  </li>
                  <li>
                    Loss or damage to property, personal injury, or death.
                  </li>
                  <li>
                    Disputes between Users and Drivers, including payment issues
                    or service quality.
                  </li>
                  <li>
                    Technical errors, data breaches, or interruptions in the
                    Platform.
                  </li>
                </ul>

                <h4 className="font-medium mt-3 mb-1">
                  4.2 VIT-AP University's Liability
                </h4>
                <p>
                  VIT-AP University ("University") is not involved in Femtro's
                  operations, management, or services. The University:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Bears no financial, legal, or operational responsibility for
                    Femtro's services.
                  </li>
                  <li>
                    Is not liable for risks, losses, damages, or disputes
                    arising from your use of the Platform.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  5. Indemnification
                </h3>
                <p>
                  You agree to indemnify, defend, and hold harmless Femtro Rides
                  Pvt Ltd, its founders, employees, and VIT-AP University from
                  any claims, liabilities, damages, or expenses (including legal
                  fees) arising from:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Your breach of these Terms.</li>
                  <li>Your use of the Platform or interaction with Drivers.</li>
                  <li>Your violation of any laws or third-party rights.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  6. Dispute Resolution
                </h3>
                <ul className="list-disc pl-5">
                  <li>
                    <strong>User-Driver Disputes:</strong> Any disputes between
                    Users and Drivers must be resolved directly between the
                    parties involved. Femtro will not mediate or participate in
                    such disputes.
                  </li>
                  <li>
                    <strong>Legal Jurisdiction:</strong> All claims related to
                    these Terms shall be governed by the laws of India and
                    subject to the exclusive jurisdiction of court.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">7. Amendments</h3>
                <p>
                  Femtro reserves the right to modify these Terms at any time.
                  Continued use of the Platform after changes constitutes
                  acceptance of the revised Terms.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-base mb-2">
                  8. Acknowledgement
                </h3>
                <p>By using the Platform, you confirm that:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>You have read, understood, and agreed to these Terms.</li>
                  <li>
                    You waive all claims against Femtro Rides Pvt Ltd and VIT-AP
                    University for liabilities arising from your use of the
                    Platform.
                  </li>
                </ul>
              </section>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Decline
              </button>
              <button
                onClick={handleAcceptTerms}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
