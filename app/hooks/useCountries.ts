import countries from 'world-countries';

interface Country {
  cca2: string;
  name: {
    common: string;
  };
  latlng: [number, number];
  region: string;
}
export type FormattedCountry = {
  value: string;
  label: string;
  latlng: [number, number];
  region: string;
};

const formattedCountries: FormattedCountry[] = countries.map(
  (country: Country) => ({
    value: country.cca2,
    label: country.name.common,
    latlng: country.latlng,
    region: country.region,
  })
);

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find(
      (item: FormattedCountry) => item.value === value
    );
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
