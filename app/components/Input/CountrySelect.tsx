'use client';

import Select from 'react-select';

import useCountries, { FormattedCountry } from '@/app/hooks/useCountries';
import { FlagIcon } from 'react-flag-kit';
import { locationType } from '../modals/RentModal/RentModal';

export interface CountrySelectProps {
  value?: locationType | null;
  onChange: (value: FormattedCountry) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as FormattedCountry)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <FlagIcon code={option.value} />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-1 border-2',
          input: () => 'text-md',
          option: () => 'text-md',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#eee',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
