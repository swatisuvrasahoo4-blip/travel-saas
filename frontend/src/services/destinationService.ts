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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export const getDestinationBySlug =
  async (
    hostname: string,
    slug: string
  ): Promise<Destination> => {
    if (!BACKEND_URL) {
      throw new Error(
        "Backend URL is not configured"
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/destination/${encodeURIComponent(
        slug
      )}?hostname=${encodeURIComponent(
        hostname
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to load destination"
      );
    }

    const data: DestinationResponse =
      await response.json();

    return data.destination;
  };