import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// GET endpoint
export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {

  const { userId } = params;
 
  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(favorites, { status: 200 });
};
