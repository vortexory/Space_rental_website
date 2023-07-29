'use client';

import React, { useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';

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
import { useRouter } from 'next/navigation';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const schema = z.object({
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

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useLoginModal();
  const { onOpen: onRegisterOpen } = useRegisterModal();

  const toggle = () => {
    onClose();
    onRegisterOpen();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    try {
      setIsLoading(true);
      const signInResponse = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (signInResponse?.ok) {
        toast.success('Logged in');
        router.refresh();
        onClose();
      }

      if (signInResponse?.error) {
        toast.error(signInResponse.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during sign-in.');
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex  flex-col gap-4  w-full  ">
      <Heading
        title="Welcome back"
        subtitle="Login to your account"
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
          First time at Space?
          <span
            onClick={toggle}
            className=" text-indigo-800 font-bold  cursor-pointer hover:underline pl-2 "
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
