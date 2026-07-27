import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import './globals.css';
import FooterToggle from '@/components/FooterToggle';
// import HeaderToggle from '.HeaderToggle/components/HeaderToggle';
import HeaderToggle from '@/components/HeaderToggle';
import { SITE_URL } from '@/lib/siteConfig';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Global Business Tech',
  description: 'Global Business Tech - Building the Future of Technology',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  // HeaderToggle and FooterToggle will hide components on admin routes
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`} suppressHydrationWarning>
        <HeaderToggle />
        {children}
        <FooterToggle />
      </body>
    </html>
  );
}
