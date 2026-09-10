import axios from "axios";

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
   WHY CHOOSE US BENEFIT
========================================= */

export interface AgencyWhyChooseBenefit {
  icon: string;
  title: string;
  description: string;
}

/* =========================================
   WHY CHOOSE US
========================================= */

export interface AgencyWhyChooseUs {
  label: string;
  heading: string;
  description: string;
  backgroundImage: string;
  benefits: AgencyWhyChooseBenefit[];
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
   PACKAGES PAGE CTA
========================================= */

export interface AgencyPackagesPageCta {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

/* =========================================
   PACKAGES PAGE
========================================= */

export interface AgencyPackagesPage {
  heroImage: string;
  label: string;
  title: string;
  description: string;

  cta: AgencyPackagesPageCta;
}

/* =========================================
   PACKAGE DETAIL CTA
========================================= */

export interface AgencyPackageDetailCta {
  label: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

/* =========================================
   PACKAGE DETAIL PAGE
========================================= */

export interface AgencyPackageDetail {
  label: string;
  vehicleOptionsImage: string;
  quote: string;

  cta: AgencyPackageDetailCta;
}

/* =========================================
   AGENCY
========================================= */

export interface Agency {
  _id: string;

  name: string;

  slug: string;

  domains: string[];

  phones: string[];

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

  whyChooseUs?: AgencyWhyChooseUs;

  about?: AgencyAbout;

  packagesPage?: AgencyPackagesPage;

  packageDetail?: AgencyPackageDetail;

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

/* =========================================
   BACKEND URL
========================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn(
    "NEXT_PUBLIC_BACKEND_URL is not configured"
  );
}

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

  const response =
    await axios.get<AgencyResponse>(
      `${BACKEND_URL}/agency/domain`,
      {
        params: {
          hostname,
        },
      }
    );

  return response.data.agency;
};