import prisma from '@/lib/prisma';

export interface ListingsParams {
  category?: string;
  userId?: string;
}

export default async function getListings(params: ListingsParams ) {
  try {
    const { category, userId } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
