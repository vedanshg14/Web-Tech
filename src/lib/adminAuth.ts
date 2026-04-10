import { auth } from './firebase';

// List of admin email addresses
const ADMIN_EMAILS = [
  // Add your admin email addresses here
  'atharvrastogi714@gmail.com',
  'femtroridespvtltd@gmail.com',
  'syedtahirabbashasani@gmail.com'

];

export const isUserAdmin = (email: string | null) => {
  return email && ADMIN_EMAILS.includes(email);
};