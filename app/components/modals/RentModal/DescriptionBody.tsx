import React from 'react';
import Heading from '../../Heading';
import Input from '../../Input/Input';
import { UseFormRegister } from 'react-hook-form';

type DescriptionBodyProps = {
  isLoading: boolean;
  register: UseFormRegister<any>;
  errors: any;
};
const DescriptionBody = ({
  isLoading,
  register,
  errors,
}: DescriptionBodyProps) => {
  return (
    <div className="flex flex-col gap-8 mb-6">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <hr />

      <Input
        id="price"
        label="How much you charge per night?"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default DescriptionBody;
