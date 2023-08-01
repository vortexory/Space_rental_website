
import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';

import HeartButton from '../HeartButton';
import { Favorite, Listing, User } from '@prisma/client';
import Link from 'next/link';

interface ListingCardProps {
  data: Listing;
  currentUser?: User | null;
  favorites: Favorite[];
}

const ListingCard = ({ data, currentUser, favorites }: ListingCardProps) => {

  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  return (
    <Link
      href={`/listings/${data.id}`}
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
          <div className="flex flex-row items-center gap-1">
            <span className="font-semibold">$ {data.price}</span>{' '}
            <div className="font-light">/ night</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
