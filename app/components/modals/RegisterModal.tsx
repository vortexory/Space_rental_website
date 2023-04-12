'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import React, { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Input/Input';
import { toast } from 'react-hot-toast';

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

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
