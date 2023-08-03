
interface IParams {
  listingId?: string;
  userId?:string

}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId,userId} = params;

    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}