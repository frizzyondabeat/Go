import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple CSS class strings or objects using Tailwind CSS utility classes and returns the combined class string.
 *
 * @param inputs - An array of CSS class strings or objects to be merged.
 * @returns A single string representing the merged CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
