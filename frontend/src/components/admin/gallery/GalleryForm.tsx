import {
  FormEvent,
  useState,
} from "react";

import {
  AdminGalleryCategory,
  AdminGalleryItem,
  AdminGalleryStatus,
  createAdminGalleryItem,
  uploadAdminGalleryImages,
} from "@/services/adminGalleryService";

import GalleryImageUploader from "./GalleryImageUploader";

interface GalleryFormProps {
  csrfToken: string;

  onCreated: (
    items: AdminGalleryItem[]
  ) => void;

  onCancel: () => void;
}

const GalleryForm = ({
  csrfToken,
  onCreated,
  onCancel,
}: GalleryFormProps) => {
  const [
    files,
    setFiles,
  ] = useState<File[]>([]);

  const [
    caption,
    setCaption,
  ] = useState("");

  const [
    category,
    setCategory,
  ] =
    useState<AdminGalleryCategory>(
      "tour-moment"
    );

  const [
    status,
    setStatus,
  ] =
    useState<AdminGalleryStatus>(
      "active"
    );

  const [
    featured,
    setFeatured,
  ] = useState(false);

  const [
    featuredOrder,
    setFeaturedOrder,
  ] = useState("0");

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  /* =========================================
     RESET
  ========================================= */

  const resetForm = () => {
    setFiles([]);
    setCaption("");
    setCategory(
      "tour-moment"
    );
    setStatus("active");
    setFeatured(false);
    setFeaturedOrder("0");
    setError("");
  };

  /* =========================================
     CANCEL
  ========================================= */

  const handleCancel = () => {
    if (isSaving) {
      return;
    }

    resetForm();
    onCancel();
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");

      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      if (
        files.length === 0
      ) {
        setError(
          "Please select at least one image."
        );

        return;
      }

      const parsedOrder =
        Number(
          featuredOrder
        );

      if (
        !Number.isFinite(
          parsedOrder
        ) ||
        parsedOrder < 0
      ) {
        setError(
          "Featured order must be zero or greater."
        );

        return;
      }

      try {
        setIsSaving(true);

        /* =====================================
           1. UPLOAD FILES TO CLOUDINARY
        ===================================== */

        const uploadResponse =
          await uploadAdminGalleryImages(
            files,
            csrfToken
          );

        if (
          uploadResponse.images
            .length === 0
        ) {
          throw new Error(
            "No uploaded images returned."
          );
        }

        /* =====================================
           2. CREATE DATABASE GALLERY ITEMS
        ===================================== */

        const createdResponses =
          await Promise.all(
            uploadResponse.images.map(
              (
                uploadedImage,
                index
              ) =>
                createAdminGalleryItem(
                  {
                    imageUrl:
                      uploadedImage.imageUrl,

                    caption:
                      caption.trim(),

                    category,

                    featured,

                    /*
                     * If several featured
                     * images are uploaded,
                     * give each one the next
                     * order number.
                     */
                    featuredOrder:
                      featured
                        ? parsedOrder +
                          index
                        : 0,

                    status,
                  },
                  csrfToken
                )
            )
          );

        const createdItems =
          createdResponses.map(
            (response) =>
              response.galleryItem
          );

        onCreated(
          createdItems
        );

        resetForm();
      } catch (submitError) {
        console.error(
          "Gallery upload error:",
          submitError
        );

        setError(
          "Unable to upload gallery images. Please try again."
        );
      } finally {
        setIsSaving(false);
      }
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="rounded-2xl border border-[#e1eaee] bg-white p-5"
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6">
        <h3 className="font-serif text-2xl text-[#06364a]">
          Add Gallery Images
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Upload one or multiple
          travel images from your
          device.
        </p>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =====================================
          IMAGE UPLOADER
      ===================================== */}

      <GalleryImageUploader
        files={files}
        onChange={
          setFiles
        }
        disabled={
          isSaving
        }
      />

      {/* =====================================
          DETAILS
      ===================================== */}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Caption */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[#06364a]">
            Caption
          </label>

          <input
            type="text"
            value={caption}
            disabled={
              isSaving
            }
            onChange={(
              event
            ) =>
              setCaption(
                event.target
                  .value
              )
            }
            placeholder="Example: Sunrise at Puri Beach"
            className="h-11 w-full rounded-xl border border-[#dbe7eb] px-4 text-sm outline-none transition focus:border-[#06364a] disabled:cursor-not-allowed disabled:bg-slate-50"
          />

          {files.length >
            1 && (
            <p className="mt-1 text-xs text-slate-400">
              This caption will
              be applied to all
              selected images.
            </p>
          )}
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#06364a]">
            Category
          </label>

          <select
            value={category}
            disabled={
              isSaving
            }
            onChange={(
              event
            ) =>
              setCategory(
                event.target
                  .value as AdminGalleryCategory
              )
            }
            className="h-11 w-full rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a] disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="customer-trip">
              Customer Trip
            </option>

            <option value="tour-moment">
              Tour Moment
            </option>

            <option value="vehicle">
              Vehicle
            </option>

            <option value="group-tour">
              Group Tour
            </option>

            <option value="special-moment">
              Special Moment
            </option>
          </select>
        </div>

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#06364a]">
            Status
          </label>

          <select
            value={status}
            disabled={
              isSaving
            }
            onChange={(
              event
            ) =>
              setStatus(
                event.target
                  .value as AdminGalleryStatus
              )
            }
            className="h-11 w-full rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a] disabled:cursor-not-allowed disabled:bg-slate-50"
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* Featured */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#06364a]">
            Featured
          </label>

          <label className="flex h-11 items-center gap-3 rounded-xl border border-[#dbe7eb] px-4">
            <input
              type="checkbox"
              checked={
                featured
              }
              disabled={
                isSaving
              }
              onChange={(
                event
              ) =>
                setFeatured(
                  event.target
                    .checked
                )
              }
              className="h-4 w-4 accent-[#06364a]"
            />

            <span className="text-sm text-slate-600">
              Show on homepage
            </span>
          </label>
        </div>

        {/* Featured Order */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-[#06364a]">
            Featured Order
          </label>

          <input
            type="number"
            min="0"
            value={
              featuredOrder
            }
            disabled={
              !featured ||
              isSaving
            }
            onChange={(
              event
            ) =>
              setFeaturedOrder(
                event.target
                  .value
              )
            }
            className="h-11 w-full rounded-xl border border-[#dbe7eb] px-4 text-sm outline-none transition focus:border-[#06364a] disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />

          {featured &&
            files.length >
              1 && (
              <p className="mt-1 text-xs text-slate-400">
                Images will use
                consecutive order
                numbers starting
                from this value.
              </p>
            )}
        </div>
      </div>

      {/* =====================================
          UPLOAD SUMMARY
      ===================================== */}

      {files.length > 0 && (
        <div className="mt-5 rounded-xl bg-[#f4f9fb] px-4 py-3">
          <p className="text-sm text-[#52727f]">
            <span className="font-semibold text-[#06364a]">
              {files.length}
            </span>{" "}
            {files.length === 1
              ? "image"
              : "images"}{" "}
            ready to upload.
          </p>
        </div>
      )}

      {/* =====================================
          ACTIONS
      ===================================== */}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={
            isSaving
          }
          onClick={
            handleCancel
          }
          className="h-11 rounded-xl border border-[#dbe7eb] px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSaving ||
            files.length ===
              0
          }
          className="h-11 rounded-xl bg-[#ff681f] px-6 text-sm font-semibold text-white transition hover:bg-[#e65c16] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving
            ? files.length >
              1
              ? "Uploading Images..."
              : "Uploading Image..."
            : files.length >
                1
              ? `Upload ${files.length} Images`
              : "Upload Image"}
        </button>
      </div>
    </form>
  );
};

export default GalleryForm;