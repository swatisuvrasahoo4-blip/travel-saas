import Agency from "../models/Agency.js";

/* =========================================
   NORMALIZE DOMAIN
========================================= */

const normalizeDomain = (domain) => {
  if (!domain) {
    return "";
  }

  return domain
    .toString()
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];
};

/* =========================================
   CREATE AGENCY
========================================= */

export const createAgency = async (
  req,
  res
) => {
  try {
    const {
      name,
      slug,
      domains,
      phone,
      email,
      address,
      tagline,
      logo,
      favicon,
      heroImage,
      servicesBackgroundImage,
      travelTypes,
      featuredDestinations,
      enquiryOptions,
      about,
      primaryColor,
      secondaryColor,
      accentColor,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message:
          "Agency name and slug are required",
      });
    }

    const normalizedSlug =
      slug
        .toLowerCase()
        .trim();

    /* =====================================
       NORMALIZE DOMAINS
    ===================================== */

    const normalizedDomains = [
      ...new Set(
        (
          Array.isArray(domains)
            ? domains
            : []
        )
          .map(normalizeDomain)
          .filter(Boolean)
      ),
    ];

    /* =====================================
       CHECK SLUG
    ===================================== */

    const existingAgency =
      await Agency.findOne({
        slug: normalizedSlug,
      });

    if (existingAgency) {
      return res.status(409).json({
        success: false,
        message:
          "Agency with this slug already exists",
      });
    }

    /* =====================================
       CHECK DOMAINS
    ===================================== */

    if (
      normalizedDomains.length > 0
    ) {
      const existingDomain =
        await Agency.findOne({
          domains: {
            $in: normalizedDomains,
          },
        });

      if (existingDomain) {
        return res.status(409).json({
          success: false,
          message:
            "One or more domains are already assigned to another agency",
        });
      }
    }

    /* =====================================
       CREATE
    ===================================== */

    const agency =
      await Agency.create({
        name,

        slug: normalizedSlug,

        domains:
          normalizedDomains,

        phone,

        email,

        address,

        tagline,

        logo,

        favicon,

        heroImage,

        servicesBackgroundImage,

        travelTypes:
          Array.isArray(travelTypes)
            ? travelTypes
            : [],

        featuredDestinations:
          Array.isArray(
            featuredDestinations
          )
            ? featuredDestinations
            : [],

        enquiryOptions:
          enquiryOptions || {
            destinations: [],
            tripTypes: [],
          },

        about:
          about || undefined,

        primaryColor,

        secondaryColor,

        accentColor,
      });

    return res.status(201).json({
      success: true,
      message:
        "Agency created successfully",
      agency,
    });
  } catch (error) {
    console.error(
      "Create agency error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create agency",
    });
  }
};

/* =========================================
   GET AGENCY BY DOMAIN
========================================= */

export const getAgencyByDomain =
  async (req, res) => {
    try {
      const { hostname } =
        req.query;

      if (!hostname) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Hostname is required",
          });
      }

      const normalizedHostname =
        normalizeDomain(hostname);

      if (!normalizedHostname) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid hostname",
          });
      }

      const agency =
        await Agency.findOne({
          domains:
            normalizedHostname,

          status: "active",
        });

      if (!agency) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Agency not found",
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          agency,
        });
    } catch (error) {
      console.error(
        "Get agency by domain error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Unable to get agency",
        });
    }
  };