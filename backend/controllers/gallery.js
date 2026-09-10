import Agency from "../models/Agency.js";
import GalleryItem from "../models/GalleryItem.js";

/* =========================================
   NORMALIZE HOSTNAME
========================================= */

const normalizeHostname = (
  hostname = ""
) => {
  return hostname
    .toString()
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .split(":")[0];
};

/* =========================================
   FIND AGENCY BY HOSTNAME
========================================= */

const findAgencyByHostname = async (
  hostname
) => {
  const normalizedHostname =
    normalizeHostname(hostname);

  if (!normalizedHostname) {
    return null;
  }

  return Agency.findOne({
    domains: normalizedHostname,
    status: "active",
  });
};

/* =========================================
   GET ALL GALLERY ITEMS
========================================= */

export const getGalleryByDomain =
  async (req, res) => {
    try {
      const { hostname } =
        req.query;

      if (!hostname) {
        return res.status(400).json({
          message:
            "Hostname is required",
        });
      }

      const agency =
        await findAgencyByHostname(
          hostname
        );

      if (!agency) {
        return res.status(404).json({
          message:
            "Agency not found",
        });
      }

      const galleryItems =
        await GalleryItem.find({
          agencyId: agency._id,
          status: "active",
        }).sort({
          featured: -1,
          featuredOrder: 1,
          createdAt: -1,
        });

      return res
        .status(200)
        .json(galleryItems);
    } catch (error) {
      console.error(
        "Get gallery error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to fetch gallery",
      });
    }
  };

/* =========================================
   GET FEATURED GALLERY ITEMS
========================================= */

export const getFeaturedGalleryByDomain =
  async (req, res) => {
    try {
      const { hostname } =
        req.query;

      if (!hostname) {
        return res.status(400).json({
          message:
            "Hostname is required",
        });
      }

      const agency =
        await findAgencyByHostname(
          hostname
        );

      if (!agency) {
        return res.status(404).json({
          message:
            "Agency not found",
        });
      }

      const galleryItems =
        await GalleryItem.find({
          agencyId: agency._id,
          status: "active",
          featured: true,
        })
          .sort({
            featuredOrder: 1,
            createdAt: -1,
          })
          .limit(6);

      return res
        .status(200)
        .json(galleryItems);
    } catch (error) {
      console.error(
        "Get featured gallery error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to fetch featured gallery",
      });
    }
  };