import prisma from '@/lib/prisma';


export default async function getListingById(listingId: string) {
  try {
   

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
