import axios from "axios";

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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

/* =========================================
   GET ALL GALLERY ITEMS
========================================= */

export const getGallery = async (
  hostname: string
): Promise<GalleryItem[]> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response =
    await axios.get<GalleryItem[]>(
      `${BACKEND_URL}/gallery`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data;
};

/* =========================================
   GET FEATURED GALLERY ITEMS
========================================= */

export const getFeaturedGallery = async (
  hostname: string
): Promise<GalleryItem[]> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response =
    await axios.get<GalleryItem[]>(
      `${BACKEND_URL}/gallery/featured`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data;
};