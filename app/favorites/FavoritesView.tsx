import { Favorite, Listing, User } from '@prisma/client';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavoritesViewProps {
  listings: Listing[];
  currentUser?: User | null;
  favorites: Favorite[];
}

const FavoritesView = ({
  listings,
  currentUser,
  favorites,
}: FavoritesViewProps) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
      <div
        className=" mt-10 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3    lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-8 "
      >

        {favorites?.map((favorite: any) => (
          <ListingCard
            currentUser={currentUser}
            key={favorite.listing.id}
            data={favorite.listing}
            favorites={favorites}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesView;
