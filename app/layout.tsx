import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/modals/LoginModal';
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
          <Navbar currentUser={currentUser}/>
          <RegisterModal />
          <LoginModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
