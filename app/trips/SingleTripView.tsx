'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import { Favorite, Reservation, User } from '@prisma/client';

interface SingleTripeViewProps {
  reservations: Reservation[];
  currentUser?: User | null;
  favorites: Favorite[];
}

const SingleTripView = ({
  reservations,
  currentUser,
  favorites,
}: SingleTripeViewProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch((error) => {
          toast.error(`Something went wrong: ${error?.response?.data?.error}`);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className=" mt-10 grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-8 ">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
            favorites={favorites}
          />
        ))}
      </div>
    </Container>
  );
};

export default SingleTripView;
