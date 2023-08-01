'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link
      href="/"
      className="hidden md:flex md:place-items-center gap-2 font-bold tracking-widest cursor-pointer"
    >
      <Image
        alt="logo"
        className=""
        height={40}
        width={40}
        src="/images/logo.png"
      />
      SPACE
    </Link>
  );
};

export default Logo;
