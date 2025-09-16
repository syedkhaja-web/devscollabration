
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Devs Tec Collab',
  description: 'Where Developers Collaborate – Devs Tec',
  openGraph: {
    title: 'Devs Tec Collab',
    description: 'The ultimate platform for developers to host and review code, manage projects, and build software together.',
    url: 'https://devs-tec-collab.com', // Replace with your actual domain
    siteName: 'Devs Tec Collab',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a link to your logo or a featured image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devs Tec Collab',
    description: 'The ultimate platform for developers to host and review code, manage projects, and build software together.',
    images: ['https://placehold.co/1200x630.png'], // Replace with a link to your logo or a featured image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
