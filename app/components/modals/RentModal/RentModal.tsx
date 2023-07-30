'use client';
import React, { useMemo, useState } from 'react';
import Modal from '../Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../../Heading';
import { categories } from '@/data/categories';
import CategoryInput from '../../Input/CategoryInput';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import CountrySelect from '../../Input/CountrySelect';
import dynamic from 'next/dynamic';
import CategoryBody from './CategoryBody';
import LocationBody from './LocationBody';
import InfoBody from './InfoBody';
import ImageBody from './ImageBody';
import DescriptionBody from './DescriptionBody';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { isUndefined } from 'util';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
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
  price: z.coerce.number(),
  title: z.string(),
  description: z.string(),
});

type FormFieldValues = z.infer<typeof zodFormSchema>;
export type locationType = z.infer<typeof locationSchema>;

export type FormFieldKeys = keyof FormFieldValues;

const RentModal = () => {
  const router = useRouter();
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
    if (step === STEPS.DESCRIPTION) {
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
    setError,
  } = useForm<FormFieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      title: '',
      description: '',
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  const description = watch('description');
  const title = watch('title');
  const price = watch('price');

  const setCustomValue = (id: FormFieldKeys, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };


  const onSubmit: SubmitHandler<FormFieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
 
    if (step === STEPS.DESCRIPTION) {
      if (![description, title, price].every(Boolean)) {
        !description &&
          setError('description', { message: 'Description is required' });
        !title && setError('title', { message: 'Title is required' });
        !price && setError('price', { message: 'Price is required' });
        return;
      }

      setIsLoading(true);
      axios
        .post('/api/listings', data)
        .then(() => {
          toast.success('Listing created!');
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          onRentClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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

    case STEPS.INFO:
      bodyContent = (
        <InfoBody
          setCustomValue={setCustomValue}
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
        />
      );
      break;

    case STEPS.IMAGES:
      bodyContent = (
        <ImageBody
          imageSrc={imageSrc}
          setCustomValue={setCustomValue}
        />
      );
      break;

    case STEPS.DESCRIPTION:
      bodyContent = (
        <DescriptionBody
          isLoading={isLoading}
          register={register}
          errors={errors}
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
      onSubmit={handleSubmit(onSubmit)}
      onClose={onRentClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
