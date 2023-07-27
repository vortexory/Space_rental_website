'use client';

import { FieldErrors, UseFormRegister, useFormContext } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<any>;
  errors: any;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  errors,
  placeholder,
}) => {
  return (
    <div className="w-full relative flex flex-col gap-1">
      <label
        className={`     font-semibold text-sm text-slate-700
          ${errors[id] ? 'text-rose-500' : 'text-neutral-800'}
        `}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-xs italic text-red-500 ">
          {errors[id]?.message}
        </span>
      )}
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            bottom-2.5
            left-1
          "
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder={placeholder}
        type={type}
        className={`
        peer
        w-full
        p-2
        
        font-light 
        bg-white 
        border-2
        rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-7' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
          `}
      />
    </div>
  );
};

export default Input;
