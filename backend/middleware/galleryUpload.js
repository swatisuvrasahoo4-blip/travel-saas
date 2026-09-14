import multer from "multer";

/* =========================================
   MULTER MEMORY STORAGE
========================================= */

const storage =
  multer.memoryStorage();

/* =========================================
   ALLOWED IMAGE TYPES
========================================= */

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

/* =========================================
   IMAGE FILTER
========================================= */

const imageFileFilter = (
  req,
  file,
  callback
) => {
  if (
    allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return callback(
      null,
      true
    );
  }

  return callback(
    new Error(
      "Only JPG, PNG, WEBP and AVIF images are allowed."
    ),
    false
  );
};

/* =========================================
   GALLERY UPLOAD
========================================= */

const galleryUpload =
  multer({
    storage,

    fileFilter:
      imageFileFilter,

    limits: {
      // Maximum 8 MB per image.
      fileSize:
        8 * 1024 * 1024,

      // Maximum 10 images
      // in one upload.
      files: 10,
    },
  });

export default galleryUpload;