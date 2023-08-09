'use client'
import Image from 'next/image';

import useCountries from '@/app/hooks/useCountries';

import HeartButton from '../HeartButton';
import { Favorite, Listing, Reservation, User } from '@prisma/client';
import Link from 'next/link';
import Button from '../Button';
import { useCallback, useMemo } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface ListingCardProps {
  data: Listing;
  currentUser?: User | null;
  reservation?: Reservation[];
  favorites: Favorite[];
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard = ({
  data,
  currentUser,
  favorites,
  actionId,
  onAction,
  actionLabel,
  disabled,
  reservation,
}: ListingCardProps) => {
  const { getByValue } = useCountries();
  const router = useRouter();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      actionId && onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      //@ts-ignore
      return reservation?.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const dayCount = useMemo(() => {
    if (!reservation) {
      return null;
    }
    return differenceInCalendarDays(
      //@ts-ignore
      reservation?.endDate,
      //@ts-ignore
      reservation?.startDate
    );
  }, [reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    //@ts-ignore
    const start = new Date(reservation.startDate);
    //@ts-ignore
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      // href={`/listings/${data.id}`}
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
        <div className="flex flex-col mb-4">
          <span className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </span>
          <div className="font-light text-neutral-500 text-sm">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1 mb-2">
            <div className="font-semibold">$ {price}</div>
            <div className="font-light text-sm">{` - ${
              reservation
                ? //@ts-ignore
                  dayCount === 0
                  ? '1 day'
                  : //@ts-ignore
                  dayCount > 1
                  ? dayCount + ' nights'
                  : dayCount + ' night'
                : 'per night'
            }`}</div>
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
