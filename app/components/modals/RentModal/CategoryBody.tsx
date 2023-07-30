import React from 'react';
import Heading from '../../Heading';
import { categories } from '@/data/categories';
import CategoryInput from '../../Input/CategoryInput';
import { FormFieldKeys } from './RentModal';

type CategoryBodyProps = {
  category: string;
  setCustomValue: (id: FormFieldKeys, value: any) => void;
};

const CategoryBody = ({ setCustomValue, category }: CategoryBodyProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
        grid 
        grid-cols-2 md:grid-cols-3 
        gap-1 md:gap-3
        max-h-[50vh]
        overflow-y-auto
      "
      >
        {Object.entries(categories).map(([label, { icon, description }]) => (
          <div
            key={label}
            className="col-span-1s"
          >
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBody;
