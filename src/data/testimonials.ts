import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Naman Shukla',
        role: 'Bhubaneswar',
        message: `${siteDetails.siteName} has completely changed how I travel. The rides are super affordable, and the booking process is seamless. I no longer worry about last-minute transportation!`,
        avatar: '/images/user.svg',
    },
    {
        name: 'Tahir Abbas',
        role: 'Delhi',
        message: `Reliability and comfort are what set ${siteDetails.siteName} apart. The service is smooth, and the drivers are professional. Finally, a ride-hailing app that understands city travel needs!`,
        avatar: '/images/user.svg',
    },
    {
        name: 'Abhinav Pentani',
        role: 'Vijayawada',
        message: `${siteDetails.siteName} makes commuting hassle-free. The app is easy to use, and the fares are budget-friendly. It's my go-to choice for daily rides!`,
        avatar: '/images/user.svg',
    },
];
