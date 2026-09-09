import Agency from "../models/Agency.js";

export const createAgency = async (
  req,
  res
) => {
  try {
    const {
      name,
      slug,
      domain,
      phone,
      email,
      address,
      tagline,
      logo,
      heroImage,
      servicesBackgroundImage,
      travelTypes,
      featuredDestinations,
      enquiryOptions,
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
      slug.toLowerCase().trim();

    const normalizedDomain =
      domain
        ?.toLowerCase()
        .trim()
        .replace(/^www\./, "") ||
      "";

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

    if (normalizedDomain) {
      const existingDomain =
        await Agency.findOne({
          domain: normalizedDomain,
        });

      if (existingDomain) {
        return res.status(409).json({
          success: false,
          message:
            "Agency with this domain already exists",
        });
      }
    }

    const agency =
      await Agency.create({
        name,
        slug: normalizedSlug,
        domain: normalizedDomain,
        phone,
        email,
        address,
        tagline,
        logo,
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

export const getAgencyByDomain =
  async (req, res) => {
    try {
      const { hostname } = req.query;

      if (!hostname) {
        return res.status(400).json({
          success: false,
          message:
            "Hostname is required",
        });
      }

      const normalizedHostname =
        hostname
          .toString()
          .toLowerCase()
          .replace(/^www\./, "")
          .split(":")[0];

      const agency =
        await Agency.findOne({
          domain:
            normalizedHostname,
          status: "active",
        });

      if (!agency) {
        return res.status(404).json({
          success: false,
          message:
            "Agency not found",
        });
      }

      return res.status(200).json({
        success: true,
        agency,
      });
    } catch (error) {
      console.error(
        "Get agency by domain error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to get agency",
      });
    }
  };