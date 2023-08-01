export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserFavorites = async (userId: string | undefined) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/${userId}/favorites`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
