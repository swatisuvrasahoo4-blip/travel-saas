import axios from "axios";

export interface DestinationAttraction {
  title: string;
  image: string;
  description: string;
}

export interface Destination {
  _id: string;
  agencyId: string;

  name: string;
  slug: string;
  subtitle: string;

  heroImage: string;
  cardImage: string;

  description: string;

  attractions: DestinationAttraction[];

  bestTimeToVisit: string;
  idealDuration: string;
  location: string;
  type: string;

  ctaImage: string;

  gallery: string[];

  status: "active" | "inactive";
}

interface DestinationResponse {
  success: boolean;
  destination: Destination;
}

interface DestinationsResponse {
  success: boolean;
  destinations: Destination[];
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

/* =========================================
   GET ALL DESTINATIONS
========================================= */

export const getDestinations = async (
  hostname: string
): Promise<Destination[]> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response =
    await axios.get<DestinationsResponse>(
      `${BACKEND_URL}/destination`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.destinations;
};

/* =========================================
   GET DESTINATION BY SLUG
========================================= */

export const getDestinationBySlug = async (
  hostname: string,
  slug: string
): Promise<Destination> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response =
    await axios.get<DestinationResponse>(
      `${BACKEND_URL}/destination/${encodeURIComponent(
        slug
      )}`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.destination;
};