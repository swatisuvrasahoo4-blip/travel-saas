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

/* =========================================
   ABOUT HERO
========================================= */

export interface AgencyAboutHero {
  label: string;
  title: string;
  description: string;
  image: string;
}

/* =========================================
   ABOUT STORY
========================================= */

export interface AgencyAboutStory {
  label: string;
  title: string;
  paragraphs: string[];
  image: string;
}

/* =========================================
   ABOUT REASON
========================================= */

export interface AgencyAboutReason {
  icon: string;
  title: string;
  description: string;
}

/* =========================================
   ABOUT STAT
========================================= */

export interface AgencyAboutStat {
  value: string;
  label: string;
}

/* =========================================
   MISSION / VISION
========================================= */

export interface AgencyMissionVisionItem {
  heading: string;
  description: string;
}

/* =========================================
   ABOUT CTA
========================================= */

export interface AgencyAboutCta {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

/* =========================================
   ABOUT PAGE
========================================= */

export interface AgencyAbout {
  hero: AgencyAboutHero;

  story: AgencyAboutStory;

  reasonsLabel: string;
  reasonsHeading: string;
  reasonsDescription: string;
  reasons: AgencyAboutReason[];

  statsBackgroundImage: string;
  stats: AgencyAboutStat[];

  missionVisionLabel: string;
  missionVisionTitle: string;
  missionVisionDescription: string;

  mission: AgencyMissionVisionItem;
  vision: AgencyMissionVisionItem;

  cta: AgencyAboutCta;
}

/* =========================================
   AGENCY
========================================= */

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

  about?: AgencyAbout;

  primaryColor: string;

  secondaryColor: string;

  accentColor: string;

  status: "active" | "inactive";
}

/* =========================================
   API RESPONSE
========================================= */

interface AgencyResponse {
  success: boolean;
  agency: Agency;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

/* =========================================
   GET AGENCY BY DOMAIN
========================================= */

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