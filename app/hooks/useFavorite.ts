import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { Favorite, User } from '@prisma/client';
import { BASE_URL } from '@/lib/constants';

interface UseFavoriteProps {
  listingId: string;
  currentUser?: User | null;
  favorites: Favorite[];
}

const useFavorite = ({ listingId, currentUser, favorites }: UseFavoriteProps) => {
  const router = useRouter();

  const { onOpen } = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = favorites.map((item) => item.listingId);

    return list.includes(listingId);
  }, [favorites, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(`${BASE_URL}/api/favorites/${listingId}`);
          router.refresh();
          toast.success('Removed from Favorites');
        } else {
          await axios.post(`${BASE_URL}/api/favorites/${listingId}`);
          router.refresh();
          toast.success('Added to Favorites');
        }
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [currentUser, hasFavorited, listingId, onOpen, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
