'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { onOpen: onOpenRegiter } = useRegisterModal();
  const { onOpen: onOpenLogin } = useLoginModal();
  const { onOpen: onOpenRent } = useRentModal();


  const onRent = useCallback(() => {
    if (!currentUser) {
      return onOpenLogin();
    }
    onOpenRent();
  }, [currentUser, onOpenLogin, onOpenRent]);

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer
        "
          onClick={onRent}
        >
          Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="md:py-1 md: px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer  shadow-sm hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {currentUser ? (
              <>
                <MenuItem
                  onClick={onOpenRent}
                  label="Your Home"
                />
                <hr />
                <MenuItem
                  onClick={() => signOut()}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={onOpenLogin}
                  label="Login"
                />
                <MenuItem
                  onClick={onOpenRegiter}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
