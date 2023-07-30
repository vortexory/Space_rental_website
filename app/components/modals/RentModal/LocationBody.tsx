import React, { useMemo } from 'react';
import Heading from '../../Heading';
import CountrySelect from '../../Input/CountrySelect';
import { FormFieldKeys } from './RentModal';
import dynamic from 'next/dynamic';



type LocationBodyProps = {
  location: any;
  setCustomValue: (id: FormFieldKeys, value: any) => void;
};
const LocationBody = ({ location, setCustomValue }: LocationBodyProps) => {
  const Map = useMemo(
    () => dynamic(() => import('../../Map'), { ssr: false }),
  
    [location]
  );
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect
        value={location}
        onChange={(val) => setCustomValue('location', val)}
      />
      <Map location={location} />
    </div>
  );
};

export default LocationBody;
