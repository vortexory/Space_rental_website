'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import React, { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

const RegisterModal = () => {
  const { isOpen, onClose } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //to fix post data to end point
    setIsLoading(true);

    // alert(JSON.stringify(data));
    toast.success(JSON.stringify(data));
    setTimeout(() => {
      onClose();
    }, 3000);

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex  flex-col gap-4 md:min-w-[30rem] w-full nmax-w-xl mx-auto ">
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
        required
        placeholder="name@space.com"
      />
      <Input
        id="name"
        label="Full name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder="Green Bonnie"
      />
      <Input
        id="password"
        type="password"
        label="Your password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        Icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
          text-neutral-500 text-center  mt-4  font-light
        "
      >
        <p>
          Already have an account?
          <span
            onClick={onClose}
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
