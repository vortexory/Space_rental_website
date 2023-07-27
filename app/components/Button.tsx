'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  Icon?: IconType;
}
const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg  
                  transition w-full flex  items-center justify-center gap-4  px-6
         ${outline ? 'bg-white border-black text-black hover:bg-indigo-50'
                  : 'bg-indigo-500 border-indigo-500 text-white hover:opacity-80'}
         ${small? 'py-1 text-sm font-light border-[1px]'
              : 'py-3 text-md font-semibold border-2'}

  `}
    >
      {Icon && (
        <Icon
          size={24}
          className="-ml-2"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
