import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';

interface ParamsType {
  listingId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: ParamsType }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }
  const userId = currentUser.id;

  const favorites = await prisma.favorite.create({
    data: {
      listingId,
      userId,
    },
  });

  return NextResponse.json(favorites);
}

export async function DELETE(
  request: Request,
  { params }: { params: ParamsType }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  const userId = currentUser.id;
  const favorite = await prisma.favorite.deleteMany({
    where: {
      userId,
      listingId,
    },
  });

  return NextResponse.json(favorite);
}
