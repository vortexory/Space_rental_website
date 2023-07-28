'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { onOpen: onOpenRegiter } = useRegisterModal();
  const { onOpen: onOpenLogin } = useLoginModal();

  const handleRegister = () => {
    onOpenRegiter();
    setIsOpen(false);
  };
  const handleLogin = () => {
    onOpenLogin();
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer
        "
        >
          Your Home
        </div>
        <div
          onClick={toggleOpen}
          className="md:py-1 md: px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer  shadow-sm hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm ">
          <div className="flex flex-col cursor-pointer">
            <MenuItem
              onClick={handleLogin}
              label="Login"
            />
            <MenuItem
              onClick={handleRegister}
              label="Sign up"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
