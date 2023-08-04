import prisma from '@/lib/prisma';

export interface ListingsParams {
  category?: string;
  userId?: string;

  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}

export default async function getListings(params: ListingsParams) {
  try {
    const {
      category,
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate:startDateQuery,
      endDate:endDateQuery,
    } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (userId) {
      query.userId = userId;
    }

    
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDateQuery && endDateQuery) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDateQuery },
                startDate: { lte: startDateQuery }
              },
              {
                startDate: { lte: endDateQuery },
                endDate: { gte: endDateQuery }
              }
            ]
          }
        }
      }
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
