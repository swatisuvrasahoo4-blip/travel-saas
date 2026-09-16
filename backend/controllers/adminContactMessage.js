import mongoose from "mongoose";

import ContactMessage from "../models/ContactMessage.js";

/*
 * Escape special RegExp characters so user supplied
 * search text cannot modify the RegExp pattern.
 */
const escapeRegExp = (value = "") => {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
};

/*
 * GET /api/admin/contact-messages
 *
 * Get messages belonging ONLY to the
 * authenticated admin's agency.
 */
export const getContactMessages = async (
  req,
  res
) => {
  try {
    const agencyId = req.admin.agencyId;

    const rawPage = Number(req.query.page);
    const rawLimit = Number(req.query.limit);

    const page =
      Number.isInteger(rawPage) && rawPage > 0
        ? rawPage
        : 1;

    const limit =
      Number.isInteger(rawLimit) &&
      rawLimit > 0
        ? Math.min(rawLimit, 50)
        : 10;

    const skip = (page - 1) * limit;

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim().slice(0, 100)
        : "";

    const status =
      typeof req.query.status === "string"
        ? req.query.status.trim().toLowerCase()
        : "";

    /*
     * SECURITY:
     * agencyId always comes from requireAdmin.
     *
     * Never take agencyId from:
     * req.body
     * req.query
     * req.params
     */
    const filter = {
      agencyId,
    };

    if (
      status === "new" ||
      status === "read"
    ) {
      filter.status = status;
    }

    if (search) {
      const safeSearch = escapeRegExp(search);

      const regex = new RegExp(
        safeSearch,
        "i"
      );

      filter.$or = [
        {
          name: regex,
        },
        {
          email: regex,
        },
        {
          phone: regex,
        },
        {
          subject: regex,
        },
      ];
    }

    const [
      messages,
      totalMessages,
      newMessages,
    ] = await Promise.all([
      ContactMessage.find(filter)
        .select(
          "name email phone subject message status createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      ContactMessage.countDocuments(
        filter
      ),

      ContactMessage.countDocuments({
        agencyId,
        status: "new",
      }),
    ]);

    const totalPages = Math.ceil(
      totalMessages / limit
    );

    return res.status(200).json({
      success: true,

      messages,

      unreadCount: newMessages,

      pagination: {
        page,
        limit,
        totalMessages,
        totalPages,
        hasNextPage:
          page < totalPages,
        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error(
      "Get admin contact messages error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to load contact messages.",
    });
  }
};

/*
 * GET /api/admin/contact-messages/:id
 *
 * Fetch one message.
 *
 * The message ID AND agency ID must both match.
 */
export const getContactMessageById =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid contact message ID.",
        });
      }

      const contactMessage =
        await ContactMessage.findOne({
          _id: id,
          agencyId,
        })
          .select(
            "name email phone subject message status createdAt updatedAt"
          )
          .lean();

      /*
       * We intentionally return the same
       * result whether:
       *
       * - the message doesn't exist
       * - it belongs to another agency
       *
       * This avoids leaking tenant information.
       */
      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message:
            "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        contactMessage,
      });
    } catch (error) {
      console.error(
        "Get admin contact message error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to load contact message.",
      });
    }
  };

/*
 * PATCH /api/admin/contact-messages/:id/read
 *
 * Mark one message as read.
 */
export const markContactMessageAsRead =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid contact message ID.",
        });
      }

      const contactMessage =
        await ContactMessage.findOneAndUpdate(
          {
            _id: id,
            agencyId,
          },
          {
            $set: {
              status: "read",
            },
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .select(
            "_id status updatedAt"
          )
          .lean();

      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message:
            "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Contact message marked as read.",
        contactMessage,
      });
    } catch (error) {
      console.error(
        "Mark contact message as read error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to update contact message.",
      });
    }
  };

/*
 * DELETE /api/admin/contact-messages/:id
 *
 * Delete one message belonging to the
 * authenticated agency only.
 */
export const deleteContactMessage =
  async (req, res) => {
    try {
      const agencyId =
        req.admin.agencyId;

      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          id
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid contact message ID.",
        });
      }

      const contactMessage =
        await ContactMessage.findOneAndDelete(
          {
            _id: id,
            agencyId,
          }
        );

      if (!contactMessage) {
        return res.status(404).json({
          success: false,
          message:
            "Contact message not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Contact message deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete contact message error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to delete contact message.",
      });
    }
  };