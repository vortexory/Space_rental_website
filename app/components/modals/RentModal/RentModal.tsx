'use client';
import React, { useMemo, useState } from 'react';
import Modal from '../Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../../Heading';
import { categories } from '@/data/categories';
import CategoryInput from '../../Input/CategoryInput';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import CountrySelect from '../../Input/CountrySelect';
import dynamic from 'next/dynamic';
import CategoryBody from './CategoryBody';
import LocationBody from './LocationBody';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const locationSchema = z.object({
  value: z.string(),
  label: z.string(),
  latlng: z.array(z.number()),
  region: z.string(),
});

// Define the Zod schema for the form fields
const zodFormSchema = z.object({
  category: z.string(),
  location: z.union([locationSchema, z.null()]),
  guestCount: z.number().int().min(1),
  roomCount: z.number().int().min(1),
  bathroomCount: z.number().int().min(1),
  imageSrc: z.string(),
  price: z.number().min(1),
  title: z.string(),
  description: z.string(),
});

type FormFieldValues = z.infer<typeof zodFormSchema>;
export type locationType = z.infer<typeof locationSchema>;

export type FormFieldKeys = keyof FormFieldValues;

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen: isRentOpen, onClose: onRentClose } = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  //form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormFieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');

  const setCustomValue = (id: FormFieldKeys, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let bodyContent;
  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <CategoryBody
          category={category}
          setCustomValue={setCustomValue}
        />
      );
      break;

    case STEPS.LOCATION:
      bodyContent = (
        <LocationBody
          location={location}
          setCustomValue={setCustomValue}
        />
      );
      break;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={isRentOpen}
      title="You Home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={onRentClose}
      onSubmit={onNext}
      body={bodyContent}
    />
  );
};

export default RentModal;
