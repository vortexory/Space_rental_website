'use client';

import dynamic from 'next/dynamic';

import useCountries, { FormattedCountry } from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import { User } from '@prisma/client';
import ListingCategory from './ListingCategory';
import { categories } from '@/data/categories';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: User;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categoryLabel: string;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  categoryLabel,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue) as FormattedCountry;

  const categoryObject = categories[categoryLabel];

  return (
    <div className="col-span-4 flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-2">
        <div
          className=" text-xl font-semibold   
          flex  flex-row  items-center gap-2 "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image || '/images/user.png'} />
        </div>
        <div
          className="  flex   items-center  gap-4 
            font-light  text-neutral-500  "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {categoryObject && (
        <ListingCategory
          icon={categoryObject.icon}
          label={categoryLabel}
          description={categoryObject?.description}
        />
      )}
      <hr />
      <div className=" text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map location={coordinates} />
    </div>
  );
};

export default ListingInfo;
