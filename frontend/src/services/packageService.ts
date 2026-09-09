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

export const getFeaturedPackages =
  async (
    hostname: string
  ): Promise<TourPackage[]> => {
    const backendUrl =
      getBackendUrl();

    const response = await fetch(
      `${backendUrl}/package/featured?hostname=${encodeURIComponent(
        hostname
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load featured packages"
      );
    }

    const data: PackagesResponse =
      await response.json();

    return data.packages;
  };

export const getPackages =
  async (
    hostname: string
  ): Promise<TourPackage[]> => {
    const backendUrl =
      getBackendUrl();

    const response = await fetch(
      `${backendUrl}/package?hostname=${encodeURIComponent(
        hostname
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load packages"
      );
    }

    const data: PackagesResponse =
      await response.json();

    return data.packages;
  };

export const getPackageBySlug =
  async (
    hostname: string,
    slug: string
  ): Promise<TourPackage> => {
    const backendUrl =
      getBackendUrl();

    const response = await fetch(
      `${backendUrl}/package/${encodeURIComponent(
        slug
      )}?hostname=${encodeURIComponent(
        hostname
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load package"
      );
    }

    const data: PackageResponse =
      await response.json();

    return data.package;
  };