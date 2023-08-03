import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';

import SingleTripView from './SingleTripView';
import getReservations from '../actions/getReservation';
import { getUserFavorites } from '../actions/getUserFavorites';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trip yet!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <SingleTripView
        reservations={reservations}
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  );
};

export default TripsPage;
