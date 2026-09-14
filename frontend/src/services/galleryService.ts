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

  status:
    | "active"
    | "inactive";

  createdAt: string;
  updatedAt: string;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================
   GET ALL GALLERY ITEMS
========================================= */

export const getGallery =
  async (
    hostname: string
  ): Promise<GalleryItem[]> => {
    const response =
      await axios.get<GalleryItem[]>(
        `${API_URL}/gallery`,
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

export const getFeaturedGallery =
  async (
    hostname: string
  ): Promise<GalleryItem[]> => {
    const response =
      await axios.get<GalleryItem[]>(
        `${API_URL}/gallery/featured`,
        {
          params: {
            hostname,
          },
        }
      );

    return response.data;
  };