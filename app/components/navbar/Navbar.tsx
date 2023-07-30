'use client';
import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { User } from '@prisma/client';

interface NavbarProps {
  currentUser: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div  className="pb-[4.3rem]">
      <div className="fixed w-full bg-white  z-10 shadow-sm ">
        <div className="py-3 border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
