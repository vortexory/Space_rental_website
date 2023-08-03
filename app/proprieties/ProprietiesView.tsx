'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import { Favorite, Listing, User } from '@prisma/client';

interface ProprietiesViewProps {
  listings: Listing[];
  currentUser?: User | null;
  favorites: Favorite[];
}

const ProprietiesView = ({
  currentUser,
  listings,
  favorites,
}: ProprietiesViewProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Propriety deleted');
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
        title="Properties"
        subtitle="List of your properties"
      />
      <div className=" mt-10 grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-8 ">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
            favorites={favorites}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};

export default ProprietiesView;
