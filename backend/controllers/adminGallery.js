import GalleryItem from "../models/GalleryItem.js";

/* =========================================
   ALLOWED VALUES
========================================= */

const ALLOWED_CATEGORIES = [
  "customer-trip",
  "tour-moment",
  "vehicle",
  "group-tour",
  "special-moment",
];

const ALLOWED_STATUSES = [
  "active",
  "inactive",
];

/* =========================================
   FORMAT GALLERY ITEM
========================================= */

const formatGalleryItem = (
  item
) => {
  return {
    id: item._id.toString(),

    imageUrl:
      item.imageUrl,

    caption:
      item.caption || "",

    category:
      item.category,

    featured:
      item.featured,

    featuredOrder:
      item.featuredOrder,

    status:
      item.status,

    createdAt:
      item.createdAt,

    updatedAt:
      item.updatedAt,
  };
};

/* =========================================
   GET ALL ADMIN GALLERY ITEMS
========================================= */

export const getAdminGallery =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const galleryItems =
        await GalleryItem.find({
          agencyId,
        }).sort({
          featured: -1,
          featuredOrder: 1,
          createdAt: -1,
        });

      return res
        .status(200)
        .json({
          success: true,

          galleryItems:
            galleryItems.map(
              formatGalleryItem
            ),
        });
    } catch (error) {
      console.error(
        "Get admin gallery error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to fetch gallery items",
        });
    }
  };

/* =========================================
   GET SINGLE ADMIN GALLERY ITEM
========================================= */

export const getAdminGalleryItemById =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        galleryItemId,
      } = req.params;

      const galleryItem =
        await GalleryItem.findOne({
          _id: galleryItemId,
          agencyId,
        });

      if (!galleryItem) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Gallery item not found",
          });
      }

      return res
        .status(200)
        .json({
          success: true,

          galleryItem:
            formatGalleryItem(
              galleryItem
            ),
        });
    } catch (error) {
      console.error(
        "Get admin gallery item error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to fetch gallery item",
        });
    }
  };

/* =========================================
   CREATE GALLERY ITEM
========================================= */

export const createAdminGalleryItem =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        imageUrl,
        caption = "",
        category =
          "tour-moment",
        featured = false,
        featuredOrder = 0,
        status = "active",
      } = req.body;

      const cleanImageUrl =
        imageUrl
          ?.toString()
          .trim();

      const cleanCaption =
        caption
          ?.toString()
          .trim() || "";

      if (!cleanImageUrl) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Image URL is required",
          });
      }

      if (
        !ALLOWED_CATEGORIES.includes(
          category
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid gallery category",
          });
      }

      if (
        !ALLOWED_STATUSES.includes(
          status
        )
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Invalid gallery status",
          });
      }

      const order =
        Number(
          featuredOrder
        );

      const galleryItem =
        await GalleryItem.create({
          agencyId,

          imageUrl:
            cleanImageUrl,

          caption:
            cleanCaption,

          category,

          featured:
            Boolean(
              featured
            ),

          featuredOrder:
            Number.isFinite(
              order
            ) &&
            order >= 0
              ? order
              : 0,

          status,
        });

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Gallery item added successfully",

          galleryItem:
            formatGalleryItem(
              galleryItem
            ),
        });
    } catch (error) {
      console.error(
        "Create admin gallery item error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to add gallery item",
        });
    }
  };

/* =========================================
   UPDATE GALLERY ITEM
========================================= */

export const updateAdminGalleryItem =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        galleryItemId,
      } = req.params;

      const galleryItem =
        await GalleryItem.findOne({
          _id: galleryItemId,
          agencyId,
        });

      if (!galleryItem) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Gallery item not found",
          });
      }

      const {
        imageUrl,
        caption,
        category,
        featured,
        featuredOrder,
        status,
      } = req.body;

      if (
        imageUrl !==
        undefined
      ) {
        const cleanImageUrl =
          imageUrl
            .toString()
            .trim();

        if (!cleanImageUrl) {
          return res
            .status(400)
            .json({
              success: false,

              message:
                "Image URL cannot be empty",
            });
        }

        galleryItem.imageUrl =
          cleanImageUrl;
      }

      if (
        caption !==
        undefined
      ) {
        galleryItem.caption =
          caption
            .toString()
            .trim();
      }

      if (
        category !==
        undefined
      ) {
        if (
          !ALLOWED_CATEGORIES.includes(
            category
          )
        ) {
          return res
            .status(400)
            .json({
              success: false,

              message:
                "Invalid gallery category",
            });
        }

        galleryItem.category =
          category;
      }

      if (
        featured !==
        undefined
      ) {
        if (
          typeof featured !==
          "boolean"
        ) {
          return res
            .status(400)
            .json({
              success: false,

              message:
                "Featured must be true or false",
            });
        }

        galleryItem.featured =
          featured;
      }

      if (
        featuredOrder !==
        undefined
      ) {
        const order =
          Number(
            featuredOrder
          );

        if (
          !Number.isFinite(
            order
          ) ||
          order < 0
        ) {
          return res
            .status(400)
            .json({
              success: false,

              message:
                "Featured order must be zero or greater",
            });
        }

        galleryItem.featuredOrder =
          order;
      }

      if (
        status !==
        undefined
      ) {
        if (
          !ALLOWED_STATUSES.includes(
            status
          )
        ) {
          return res
            .status(400)
            .json({
              success: false,

              message:
                "Invalid gallery status",
            });
        }

        galleryItem.status =
          status;
      }

      await galleryItem.save();

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Gallery item updated successfully",

          galleryItem:
            formatGalleryItem(
              galleryItem
            ),
        });
    } catch (error) {
      console.error(
        "Update admin gallery item error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to update gallery item",
        });
    }
  };

/* =========================================
   DELETE GALLERY ITEM
========================================= */

export const deleteAdminGalleryItem =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const {
        galleryItemId,
      } = req.params;

      const galleryItem =
        await GalleryItem.findOne({
          _id: galleryItemId,
          agencyId,
        });

      if (!galleryItem) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Gallery item not found",
          });
      }

      await GalleryItem.deleteOne({
        _id: galleryItemId,
        agencyId,
      });

      return res
        .status(200)
        .json({
          success: true,

          message:
            "Gallery item deleted successfully",
        });
    } catch (error) {
      console.error(
        "Delete admin gallery item error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to delete gallery item",
        });
    }
  };