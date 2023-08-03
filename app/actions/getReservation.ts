interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    //to get reservations on a single listing
    if (listingId) {
      query.listingId = listingId;
    }

    //to get trips that the current user have reserved
    if (userId) {
      query.userId = userId;
    }

    //to get the current user listings that have been reserved by others
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
