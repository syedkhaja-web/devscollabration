
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Devs Tec | Where Developers Collaborate',
    template: '%s | Devs Tec',
  },
  description: 'The ultimate platform for developers to host and review code, manage projects, and build software together with AI-powered tools.',
  keywords: ['developer collaboration', 'code review', 'project management', 'AI developer tools', 'open source projects', 'next.js', 'firebase', 'genkit'],
  openGraph: {
    title: 'Devs Tec | Where Developers Collaborate',
    description: 'The ultimate platform for developers to host and review code, manage projects, and build software together.',
    url: 'https://devs-tec-collab.web.app', // Using the production URL
    siteName: 'Devs Tec',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // It's a good idea to replace this with your actual logo or a feature graphic.
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devs Tec | Where Developers Collaborate',
    description: 'The ultimate platform for developers to host and review code, manage projects, and build software together.',
    images: ['https://placehold.co/1200x630.png'], // Replace this with your actual logo or a feature graphic.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
