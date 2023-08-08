'use client';

import React, { useCallback, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import Button from '../Button';
import axios from 'axios';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/lib/constants';

// Define Zod schema for form validation
const schema = z.object({
  name: z.string().nonempty('Name is required.'),
  email: z
    .string()
    .email('Invalid email address.')
    .nonempty('Email is required.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .nonempty('Password is required.'),
});

export type FormValuesType = z.infer<typeof schema>;

const RegisterModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useRegisterModal();
  const { onOpen: onLoginOpen } = useLoginModal();

  const toggle = useCallback(() => {
    onClose();
    onLoginOpen();
  }, [onClose, onLoginOpen]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setIsLoading(true);
    toast.loading('Sending Request ', { id: '1' });

    try {
      await axios.post(`${BASE_URL}/api/register`, data);
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.refresh();
      toast.success('Registered!', { id: '1' });

      onClose();
      return;
      // onLoginOpen();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error ||
          'An unexpected error occurred during registration.',
        { id: '1' }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex  flex-col gap-4  w-full  ">
      <Heading
        title="Welcome to Space"
        subtitle="Create an account"
      />
      <Input
        id="email"
        type="email"
        label="Your email"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="name@space.com"
      />
      <Input
        id="name"
        label="Full name"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder="Green Bonnie"
      />
      <Input
        id="password"
        type="password"
        label="Your password"
        disabled={isLoading}
        register={register}
        errors={errors}
        placeholder=""
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        Icon={FcGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <Button
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={() => {
          signIn('github');
        }}
      />
      <div
        className="
          text-neutral-500 text-center  mt-4  font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={toggle}
            className=" text-indigo-800 font-bold  cursor-pointer hover:underline pl-2 "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
