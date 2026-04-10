import { FiAlertCircle, FiBarChart2, FiBriefcase, FiDollarSign, FiHelpCircle, FiLock, FiPhoneCall, FiPieChart, FiShield, FiSmile, FiTarget, FiTrendingUp, FiUser, FiUsers } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
  {
    title: "Fare Bargaining",
    description:
      "Femtro introduces a unique fare bargaining system, enabling riders and drivers to negotiate ride fares before confirming the trip. This feature promotes transparency and flexibility, allowing both parties to agree on a fair price.",
    bullets: [
      {
        title: "Increased Job Satisfaction",
        description:
          "Drivers who had the opportunity to negotiate fares reported a 15% increase in job satisfaction.",
        icon: <FiSmile size={26} />, // Replace with an appropriate icon
      },
      {
        title: "Higher Earnings",
        description:
          "Drivers experienced a 10% increase in overall earnings due to flexible fare structures.",
        icon: <FiDollarSign size={26} />, // Replace with an appropriate icon
      },
      {
        title: "Enhanced Motivation",
        description:
          "Flexible fare structures enhance driver motivation and retention.",
        icon: <FiTrendingUp size={26} />, // Replace with an appropriate icon
      },
    ],
    imageSrc: "/images/fare-barganing-femtro.png",
  },
  {
    title: "SOS Safety Feature",
    description:
      "In collaboration with the government of Telangana, Femtro integrates a robust SOS safety feature for Telangana as of now. This allows users to send immediate alerts to nearby app users and authorities in case of emergencies, ensuring prompt assistance and enhanced safety.",
    bullets: [
      {
        title: "Immediate Alerts",
        description:
          "Users can send instant alerts to nearby app users and authorities during emergencies.",
        icon: <FiAlertCircle size={26} />,
      },
      {
        title: "Enhanced Safety",
        description:
          "The SOS feature ensures prompt assistance, addressing concerns for personal safety.",
        icon: <FiShield size={26} />,
      },
      {
        title: "Collaboration with Authorities",
        description:
          "Developed in collaboration with the government of Telangana for maximum effectiveness.",
        icon: <FiUsers size={26} />,
      },
    ],
    imageSrc: "/images/femtro-sos.png",
  },
  {
    title: "Hire a Driver",
    description:
      "Femtro offers a convenient 'Hire a Driver' service, allowing users to book professional drivers for their vehicles. Whether you need a driver for a day, a week, or longer, Femtro ensures reliable and experienced drivers to meet your needs.",
    bullets: [
      {
        title: "Professional Drivers",
        description:
          "All drivers are verified, licensed, and trained to provide safe and comfortable rides.",
        icon: <FiUser size={26} />,
      },
      {
        title: "Flexible Booking",
        description:
          "Book a driver for as little as a few hours or for extended periods, depending on your requirements.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "24/7 Availability",
        description:
          "Drivers are available round the clock, ensuring you have a reliable chauffeur whenever you need one.",
        icon: <FiPhoneCall size={26} />,
      },
    ],
    imageSrc: "/images/hire-driver-femtro.png",
  },
];