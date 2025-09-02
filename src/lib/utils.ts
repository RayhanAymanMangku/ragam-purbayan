import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import localFont from "next/font/local"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Collapse spaces and hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // Generate a short random string (e.g., 6 characters)
  const randomString = Math.random().toString(36).substring(2, 8);

  // Append the random string to make the slug unique
  return `${baseSlug}-${randomString}`;
}

export const heliosfont = localFont({
  src: [
    {
      path: '../../public/fonts/heliosext.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-monument'
})
