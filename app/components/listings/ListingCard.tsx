'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';


import useCountries from '@/app/hooks/useCountries';

import HeartButton from '../HeartButton';
import { Favorite, Listing, User } from '@prisma/client';

interface ListingCardProps {
  data: Listing;
  currentUser?: User | null;
  favorites: Favorite[];
}

const ListingCard = ({ data, currentUser, favorites }: ListingCardProps) => {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className=" aspect-square   w-full   relative  overflow-hidden  rounded-xl ">
          <Image
            fill
            className="object-cover  h-full  w-full 
              group-hover:scale-110  transition"
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
              favorites={favorites}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </span>
          <span className="font-light text-neutral-500">{data.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
