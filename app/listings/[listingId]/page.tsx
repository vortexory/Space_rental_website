import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import SingleListingView from './SingleListingView';
import { getUserFavorites } from '@/app/actions/getUserFavorites';
import getReservations from '@/app/actions/getReservation';
import getListings from '@/app/actions/getListings';

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const listings = await getListings({})
 
  return listings.map((listing) => ({
    listingId: listing.id,
  }))
}

const SingleListing = async ({ params }: { params: { listingId: string } }) => {
  const { listingId } = params;
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="h-4" />
      <SingleListingView
        listing={listing}
        currentUser={currentUser}
        favorites={favorites}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default SingleListing;
