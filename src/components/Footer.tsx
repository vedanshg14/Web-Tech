"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

import { siteDetails } from "@/data/siteDetails";
import { footerDetails } from "@/data/footer";
import { getPlatformIconByName } from "@/utils";
import { useTheme } from "@/components/ThemeContext";

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-hero-background text-foreground py-10">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={
                theme === "dark"
                  ? "/images/femtro-dark.png"
                  : "/images/femtro.png"
              }
              alt={`${siteDetails.siteName} Logo`}
              width={50}
              height={50}
              className="min-w-fit w-10 h-10 md:w-12 md:h-12"
            />
          </Link>
          <p className="mt-3.5 text-foreground-accent">
            {footerDetails.subheading}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="text-foreground-accent">
            {footerDetails?.quickLinks?.map((link) => (
              <li key={link.text} className="mb-2">
                <Link href={link.url} className="hover:text-foreground">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>

          {footerDetails.email && (
            <a
              href={`mailto:${footerDetails.email}`}
              className="block text-foreground-accent hover:text-foreground"
            >
              Email: {footerDetails.email}
            </a>
          )}

          {footerDetails.telephone && (
            <a
              href={`tel:${footerDetails.telephone}`}
              className="block text-foreground-accent hover:text-foreground"
            >
              Phone: {footerDetails.telephone}
            </a>
          )}

          {footerDetails.socials &&
            Object.keys(footerDetails.socials).length > 0 && (
              <div className="mt-5 flex items-center gap-5 flex-wrap">
                {Object.keys(footerDetails.socials).map((platformName) => {
                  const IconComponent = getPlatformIconByName(platformName);
                  return (
                    IconComponent && (
                      <Link
                        href={footerDetails.socials[platformName]}
                        key={platformName}
                        aria-label={platformName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {IconComponent}
                      </Link>
                    )
                  );
                })}
              </div>
            )}
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 md:text-center text-foreground-accent px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} {siteDetails.siteName}.
          All rights reserved.
        </p>
        <p className="text-sm mt-2 text-gray-500">
          Made with &hearts; by Team Femtro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
