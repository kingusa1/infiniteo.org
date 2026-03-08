import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoBackground from '@/components/layout/VideoBackground';
import AIChatbot from '@/components/ai/AIChatbot';

import { Poppins, PT_Sans } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: '/infiniteo.png',
    shortcut: '/infiniteo.png',
    apple: '/infiniteo.png',
  },
  title: {
    default: 'Infiniteo: Automation Without Limits',
    template: '%s | Infiniteo',
  },
  description: 'Empowering every organization and individual with limitless, intuitive automation solutions—driving efficiency, innovation, and seamless operations across all digital channels.',
  keywords: ['automation', 'B2B SaaS', 'workflow automation', 'CRM integration', 'social media automation', 'digital platform automation', 'custom workflows', 'Infiniteo'],
  metadataBase: new URL('https://infiniteo.org'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://infiniteo.org',
    siteName: 'Infiniteo',
    title: 'Infiniteo: Automation Without Limits',
    description: 'Empowering every organization with limitless automation solutions.',
    images: [{ url: '/infiniteo.png', width: 512, height: 512, alt: 'Infiniteo Logo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infiniteo: Automation Without Limits',
    description: 'Empowering every organization with limitless automation solutions.',
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${ptSans.variable}`}>
      <body className="font-body antialiased flex flex-col min-h-screen bg-transparent">
        <VideoBackground />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AIChatbot />
        <Toaster />
      </body>
    </html>
  );
}
