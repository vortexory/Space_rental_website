import { Nunito } from 'next/font/google';
import './globals.css';

import RegisterModal from './components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Space',
  description: 'find where you stay today',
};

const nunito = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <RegisterModal />
          <LoginModal />
          <RentModal />
        </ClientOnly>
        <div className="flex flex-row min-h-screen">
          <ClientOnly>
            <Sidebar />
          </ClientOnly>
          <div className="ml-36">{children}</div>
        </div>
      </body>
    </html>
  );
}
