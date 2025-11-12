import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AR Style - Provador Virtual com IA',
  description: 'Vista-se com Inteligência Artificial e Realidade Aumentada. Experimente roupas virtualmente, veja como ficam em seu corpo e baixe com fundo normal ou transparente.',
  keywords: 'provador virtual, IA, realidade aumentada, moda, roupas, try-on virtual, inteligência artificial',
  authors: [{ name: 'AR Style Team' }],
  creator: 'AR Style',
  publisher: 'AR Style',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ar-style.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AR Style - Provador Virtual com IA',
    description: 'Vista-se com Inteligência Artificial e Realidade Aumentada. Experimente roupas virtualmente e baixe com fundo transparente.',
    url: 'https://ar-style.app',
    siteName: 'AR Style',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AR Style - Provador Virtual com IA',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AR Style - Provador Virtual com IA',
    description: 'Vista-se com Inteligência Artificial e Realidade Aumentada. Experimente roupas virtualmente.',
    images: ['/og-image.jpg'],
    creator: '@arstyle',
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
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AR Style" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}