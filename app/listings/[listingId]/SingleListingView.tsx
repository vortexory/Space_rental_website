'use client';

import Container from '@/app/components/Container';

import { Favorite, Listing, User } from '@prisma/client';
import ListingHead from '../../components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

interface SingleListingViewProps {
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
  favorites: Favorite[];
  reservations?: any[];
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const SingleListingView = ({
  listing,
  currentUser,
  favorites,
  reservations = [],
}: SingleListingViewProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div className=" mt-8  max-w-screen-lg  mx-auto ">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            favorites={favorites}
          />
        </div>
        <div className="  grid  grid-cols-1  md:grid-cols-7 lg:gap-10 md:gap-6 mt-6 ">
          <ListingInfo
            user={listing.user}
            categoryLabel={listing.category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className=" order-first  mb-10   md:order-last   md:col-span-3  ">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleListingView;
