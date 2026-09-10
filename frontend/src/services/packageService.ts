import axios from "axios";

export interface PackageDestination {
  name: string;
  image: string;
  subtitle: string;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  activities: string[];
  image: string;
}

export interface TourPackage {
  _id: string;
  agencyId: string;

  name: string;
  slug: string;
  subtitle: string;

  heroImage: string;
  cardImage: string;

  description: string;
  duration: string;

  destinations: PackageDestination[];

  tourTypes: string[];
  vehicleOptions: string[];
  highlights: string[];
  suitableFor: string[];

  itinerary: PackageItineraryDay[];

  featured: boolean;
  featuredOrder: number;

  status: "active" | "inactive";
}

interface PackagesResponse {
  success: boolean;
  packages: TourPackage[];
}

interface PackageResponse {
  success: boolean;
  package: TourPackage;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

const getBackendUrl = () => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  return BACKEND_URL;
};

/* =========================================
   GET FEATURED PACKAGES
========================================= */

export const getFeaturedPackages = async (
  hostname: string
): Promise<TourPackage[]> => {
  const backendUrl =
    getBackendUrl();

  const response =
    await axios.get<PackagesResponse>(
      `${backendUrl}/package/featured`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.packages;
};

/* =========================================
   GET ALL PACKAGES
========================================= */

export const getPackages = async (
  hostname: string
): Promise<TourPackage[]> => {
  const backendUrl =
    getBackendUrl();

  const response =
    await axios.get<PackagesResponse>(
      `${backendUrl}/package`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.packages;
};

/* =========================================
   GET PACKAGE BY SLUG
========================================= */

export const getPackageBySlug = async (
  hostname: string,
  slug: string
): Promise<TourPackage> => {
  const backendUrl =
    getBackendUrl();

  const response =
    await axios.get<PackageResponse>(
      `${backendUrl}/package/${encodeURIComponent(
        slug
      )}`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.package;
};