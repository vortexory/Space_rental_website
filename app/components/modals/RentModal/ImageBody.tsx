import React from 'react';
import Heading from '../../Heading';
import ImageUpload from '../../Input/ImageUpload';
import { FormFieldKeys } from './RentModal';

type ImageBodyProps = {
  setCustomValue: (id: FormFieldKeys, value: any) => void;
  imageSrc: string;
};
const ImageBody = ({ setCustomValue, imageSrc }: ImageBodyProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />
      <ImageUpload
        onChange={(value) => setCustomValue('imageSrc', value)}
        value={imageSrc}
      />
    </div>
  );
};

export default ImageBody;
