export interface AgencyEnquiryOptions {
  destinations: string[];
  tripTypes: string[];
}

export interface AgencyTravelType {
  title: string;
  subtitle: string;
  icon: string;
}

export interface AgencyFeaturedDestination {
  name: string;
  slug: string;
  subtitle: string;
  image: string;
}

export interface Agency {
  _id: string;
  name: string;
  slug: string;
  domain: string;
  phone: string;
  email: string;
  address: string;
  tagline: string;
  logo: string;
  favicon: string;
  heroImage: string;
  servicesBackgroundImage: string;
  travelTypes?: AgencyTravelType[];
  featuredDestinations?: AgencyFeaturedDestination[];
  enquiryOptions?: AgencyEnquiryOptions;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  status: "active" | "inactive";
}

interface AgencyResponse {
  success: boolean;
  agency: Agency;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAgencyByDomain = async (
  hostname: string
): Promise<Agency> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response = await fetch(
    `${BACKEND_URL}/agency/domain?hostname=${encodeURIComponent(
      hostname
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load agency"
    );
  }

  const data: AgencyResponse =
    await response.json();

  return data.agency;
};