
import Container from '@/app/components/Container';

import { Favorite, Listing, User } from '@prisma/client';
import ListingHead from '../../components/listings/ListingHead';

interface SingleListingViewProps {
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
  favorites: Favorite[];
}

const SingleListingView = ({
  listing,
  currentUser,
  favorites,
}: SingleListingViewProps) => {
  return (
    <Container>
      <div
        className=" mt-8  max-w-screen-lg  mx-auto "
      >
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
      </div>
    </Container>
  );
};

export default SingleListingView;
