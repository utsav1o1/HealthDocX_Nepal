import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    prescription: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'lab-report': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    imaging: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    'discharge-summary': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    insurance: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    vaccination: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    consultation: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    surgery: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  };
  return colors[category] || colors.other;
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    prescription: 'Pill',
    'lab-report': 'FlaskConical',
    imaging: 'Scan',
    'discharge-summary': 'FileText',
    insurance: 'Shield',
    vaccination: 'Syringe',
    consultation: 'Stethoscope',
    surgery: 'Scissors',
    other: 'File',
  };
  return icons[category] || icons.other;
}
