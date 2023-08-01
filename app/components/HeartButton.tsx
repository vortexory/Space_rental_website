'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Favorite, User } from '@prisma/client';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
  favorites: Favorite[];
}

const HeartButton = ({
  listingId,
  currentUser,
  favorites,
}: HeartButtonProps) => {

  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
    favorites,
  });
  

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
