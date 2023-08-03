import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import getCurrentUser from '@/app/actions/getCurrentUser';

import getReservations from '../actions/getReservation';
import { getUserFavorites } from '../actions/getUserFavorites';
import ReservationsView from './ReservationsView';

const ReservationsPage = async () => {
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

  //current user listings that have been reserved by others
  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle=" Looks like you have no reservations on your properties!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsView
        reservations={reservations}
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
