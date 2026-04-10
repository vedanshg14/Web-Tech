import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Your Ride, Your Fare, Our Safety",
    quickLinks: [
        {
            text: "About Us",
            url: "/aboutus"
        },
        {
            text: "Blogs",
            url: "/blogs"
        },
        {
            text: "FAQ",
            url: "/faq"
        },
        
    ],
    email: 'femtroridespvtltd@gmail.com',
    telephone: '+91 9963594189',
    socials: {
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        linkedin: 'https://www.linkedin.com',
        instagram: 'https://www.instagram.com',
    }
}