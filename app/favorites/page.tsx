import getCurrentUser from '../actions/getCurrentUser';
import { getUserFavorites } from '../actions/getUserFavorites';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import FavoritesView from './FavoritesView';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);

  if (favorites?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="h-4" />
      <FavoritesView
        listings={favorites}
        currentUser={currentUser}
        favorites={favorites}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
