export interface GalleryItem {
  _id: string;
  agencyId: string;
  imageUrl: string;
  caption: string;
  category:
    | "customer-trip"
    | "tour-moment"
    | "vehicle"
    | "group-tour"
    | "special-moment";
  featured: boolean;
  featuredOrder: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export const getGallery = async (
  hostname: string
): Promise<GalleryItem[]> => {
  const response = await fetch(
    `${BASE_URL}/gallery?hostname=${encodeURIComponent(
      hostname
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch gallery"
    );
  }

  return response.json();
};

export const getFeaturedGallery =
  async (
    hostname: string
  ): Promise<GalleryItem[]> => {
    const response = await fetch(
      `${BASE_URL}/gallery/featured?hostname=${encodeURIComponent(
        hostname
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to fetch featured gallery"
      );
    }

    return response.json();
  };