import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from './components/ClientOnly';

export const metadata = {
  title: 'Space',
  description: 'find where you stay today',
};

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar />
          <RegisterModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
