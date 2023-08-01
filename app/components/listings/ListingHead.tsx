'use client';

import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';
import { Favorite, User } from '@prisma/client';
import Heading from '@/app/components/Heading';
import HeartButton from '@/app/components/HeartButton';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
  favorites: Favorite[];
}

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  favorites,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="  w-full h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden  rounded-xl  relative "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className=" absolute top-5 right-5 scale-150 "
        >
          <HeartButton
            listingId={id}
            currentUser={currentUser}
            favorites={favorites}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
