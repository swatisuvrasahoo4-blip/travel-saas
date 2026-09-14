import {
  FormEvent,
  useState,
} from "react";

import {
  AdminGalleryCategory,
  AdminGalleryItem,
  AdminGalleryStatus,
  updateAdminGalleryItem,
} from "@/services/adminGalleryService";

interface GalleryEditFormProps {
  item: AdminGalleryItem;

  csrfToken: string;

  onUpdated: (
    item: AdminGalleryItem
  ) => void;

  onCancel: () => void;
}

const GalleryEditForm = ({
  item,
  csrfToken,
  onUpdated,
  onCancel,
}: GalleryEditFormProps) => {
  const [
    caption,
    setCaption,
  ] = useState(
    item.caption
  );

  const [
    category,
    setCategory,
  ] =
    useState<AdminGalleryCategory>(
      item.category
    );

  const [
    status,
    setStatus,
  ] =
    useState<AdminGalleryStatus>(
      item.status
    );

  const [
    featured,
    setFeatured,
  ] = useState(
    item.featured
  );

  const [
    featuredOrder,
    setFeaturedOrder,
  ] = useState(
    item.featuredOrder.toString()
  );

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

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
        setError(
          "Featured order must be zero or greater."
        );

        return;
      }

      try {
        setIsSaving(true);

        const response =
          await updateAdminGalleryItem(
            item.id,
            {
              caption:
                caption.trim(),

              category,

              status,

              featured,

              featuredOrder:
                featured
                  ? order
                  : 0,
            },
            csrfToken
          );

        onUpdated(
          response.galleryItem
        );
      } catch (
        submitError
      ) {
        console.error(
          "Update gallery item error:",
          submitError
        );

        setError(
          "Unable to update gallery image."
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
      {/* Header */}

      <div className="mb-6">
        <h3 className="font-serif text-2xl text-[#06364a]">
          Edit Gallery Image
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Update the image
          details and display
          settings.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Image Preview */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-[#e1eaee] bg-slate-100">
        <img
          src={item.imageUrl}
          alt={
            item.caption ||
            "Gallery image"
          }
          className="h-64 w-full object-cover sm:h-72"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
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
              Show as featured
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
        </div>
      </div>

      {/* Actions */}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={
            isSaving
          }
          onClick={
            onCancel
          }
          className="h-11 rounded-xl border border-[#dbe7eb] px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSaving
          }
          className="h-11 rounded-xl bg-[#ff681f] px-6 text-sm font-semibold text-white transition hover:bg-[#e65c16] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving
            ? "Updating..."
            : "Update Image"}
        </button>
      </div>
    </form>
  );
};

export default GalleryEditForm;