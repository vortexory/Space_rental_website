import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';

import getListings, { ListingsParams } from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';

interface HomeProps {
  searchParams: ListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (!listings.length) {
    return (
      <ClientOnly>
        <div className="w-full h-full flex items-center justify-center -mt-10">
          <EmptyState showReset />
        </div>
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
          />
        ))}
      </div>
    </ClientOnly>
  );
};

export default Home;
