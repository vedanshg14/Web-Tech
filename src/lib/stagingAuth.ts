import { auth } from "./firebase";

// List of executive team emails who can access the staging environment
const EXECUTIVE_EMAILS = [
  // Add your CEO and CTO email addresses here
  "atharvrastogi714@gmail.com", // Replace with actual CEO email if different
  "syedtahirabbashasani@gmail.com", // Replace with actual CTO email if different
  // You can add more executive emails as needed
];

export const isExecutiveTeamMember = (email: string | null) => {
  return email && EXECUTIVE_EMAILS.includes(email);
};
