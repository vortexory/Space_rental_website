import Modal from './components/modals/Modal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

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
        <Navbar />
        <Modal   title='Title' actionLabel='Submit' isOpen/>
        {children}
      </body>
    </html>
  );
}
