export const dynamic = 'force-dynamic';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';

import getListings, { ListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import { getUserFavorites } from './actions/getUserFavorites';

interface HomeProps {
  searchParams: ListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const favorites = await getUserFavorites(currentUser?.id);
  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div
        className="ml-14 sm:ml-36 p-10 z-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5  2xl:grid-cols-6 gap-8 "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
            favorites={favorites}
          />
        ))}
      </div>
    </ClientOnly>
  );
};

export default Home;
