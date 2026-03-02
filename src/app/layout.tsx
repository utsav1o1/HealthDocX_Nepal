import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/providers/Providers';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',   // Prevent invisible text during font load
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'HealthDocX — AI Medical Records for Nepal',
    template: '%s | HealthDocX',
  },
  description:
    'HealthDocX is Nepal\'s AI-powered medical document manager. Securely store, organize, and understand your health records — prescriptions, lab reports, discharge summaries — in one place.',
  keywords: [
    'health records Nepal',
    'medical documents',
    'AI healthcare Nepal',
    'prescription manager',
    'lab report storage',
    'Nepal health app',
    'HealthDocX',
  ],
  authors: [{ name: 'HealthDocX Team' }],
  creator: 'HealthDocX',
  openGraph: {
    type: 'website',
    locale: 'en_NP',
    title: 'HealthDocX — AI Medical Records for Nepal',
    description: 'AI-powered medical document management, built for Nepal.',
    siteName: 'HealthDocX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthDocX — AI Medical Records for Nepal',
    description: 'AI-powered medical document management, built for Nepal.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
