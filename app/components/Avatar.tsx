'use client';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string  ;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src}
    />
  );
};

export default Avatar;
