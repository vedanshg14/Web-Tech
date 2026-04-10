import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Can I book a ride without using the app?`,
        answer: `Yes! ${siteDetails.siteName} offers the Call and Book (CAB) feature, allowing you to book rides via phone calls. This ensures accessibility for individuals who may not have internet access or prefer traditional booking methods.`,
    },
    {
        question: `How does the SOS Safety Feature work?`,
        answer: `Our SOS Safety Feature allows users to send immediate alerts to nearby app users and authorities in case of emergencies. This ensures prompt assistance and enhances safety for all passengers and drivers. Currently, this feature is available in collaboration with the government of Telangana.`,
    },
    {
        question: `Can I negotiate ride fares on ${siteDetails.siteName}?`,
        answer: `Yes! ${siteDetails.siteName} introduces a unique fare bargaining system. Riders and drivers can negotiate fares before confirming the trip, ensuring transparency and flexibility for both parties.`,
    },
    {
        question: `How do I sign up as a driver on ${siteDetails.siteName}?`,
        answer: `Signing up as a driver is easy! Download the ${siteDetails.siteName} app, complete the registration process, and start listing your available seats to earn money while helping others reach their destinations.`,
    },
    {
        question: `How does ${siteDetails.siteName} ensure driver and passenger safety?`,
        answer: `We prioritize safety through features like the SOS Safety Feature, driver and passenger verification, and real-time ride tracking. Our goal is to provide a secure and reliable ride-sharing experience for everyone.`,
    },
];