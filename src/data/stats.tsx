import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill, PiUsersFill } from "react-icons/pi";
import { FaCar, FaShieldAlt } from "react-icons/fa";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "100+",
        icon: <PiUsersFill size={34} className="text-blue-500" />,
        description: "Happy users trusting Femtro for safe and affordable rides."
    },
    {
        title: "4.8",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Star rating, reflecting our commitment to quality and user satisfaction."
    },
    {
        title: "24/7",
        icon: <FaShieldAlt size={34} className="text-purple-500" />,
        description: "Safety ensured with our SOS feature and real-time ride tracking."
    }
];