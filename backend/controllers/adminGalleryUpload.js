import { Readable } from "stream";

import cloudinary from "../config/cloudinary.js";

/* =========================================
   UPLOAD SINGLE BUFFER TO CLOUDINARY
========================================= */

const uploadBufferToCloudinary = (
  buffer,
  folder
) =>
  new Promise(
    (
      resolve,
      reject
    ) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder,

            resource_type:
              "image",

            transformation: [
              {
                quality: "auto",
              },
              {
                fetch_format:
                  "auto",
              },
            ],
          },

          (
            error,
            result
          ) => {
            if (error) {
              reject(error);

              return;
            }

            if (!result) {
              reject(
                new Error(
                  "Cloudinary upload failed."
                )
              );

              return;
            }

            resolve(result);
          }
        );

      const readable =
        Readable.from(
          buffer
        );

      readable.pipe(
        uploadStream
      );
    }
  );

/* =========================================
   UPLOAD GALLERY IMAGES
========================================= */

export const uploadAdminGalleryImages =
  async (
    req,
    res
  ) => {
    try {
      const files =
        req.files;

      if (
        !Array.isArray(files) ||
        files.length === 0
      ) {
        return res
          .status(400)
          .json({
            success: false,

            message:
              "Please select at least one image.",
          });
      }

      const agencyId =
        req.admin.agencyId;

      const folder =
        `travel-saas/agencies/${agencyId}/gallery`;

      const uploadResults =
        await Promise.all(
          files.map(
            async (
              file
            ) => {
              const result =
                await uploadBufferToCloudinary(
                  file.buffer,
                  folder
                );

              return {
                imageUrl:
                  result.secure_url,

                publicId:
                  result.public_id,

                width:
                  result.width,

                height:
                  result.height,

                format:
                  result.format,

                originalName:
                  file.originalname,
              };
            }
          )
        );

      return res
        .status(200)
        .json({
          success: true,

          message:
            uploadResults.length ===
            1
              ? "Image uploaded successfully."
              : "Images uploaded successfully.",

          images:
            uploadResults,
        });
    } catch (error) {
      console.error(
        "Gallery image upload error:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,

          message:
            "Unable to upload gallery images.",
        });
    }
  };