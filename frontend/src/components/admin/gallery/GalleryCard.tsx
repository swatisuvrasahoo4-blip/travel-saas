import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  AdminGalleryItem,
  AdminGalleryStatus,
} from "@/services/adminGalleryService";

interface GalleryCardProps {
  item: AdminGalleryItem;

  isUpdating: boolean;
  isDeleting: boolean;

  onEdit: (
    item: AdminGalleryItem
  ) => void;

  onStatusChange: (
    item: AdminGalleryItem,
    status: AdminGalleryStatus
  ) => void;

  onFeaturedChange: (
    item: AdminGalleryItem
  ) => void;

  onDelete: (
    itemId: string
  ) => void;
}

const GalleryCard = ({
  item,
  isUpdating,
  isDeleting,
  onEdit,
  onStatusChange,
  onFeaturedChange,
  onDelete,
}: GalleryCardProps) => {
  const formatCategory = () => {
    switch (item.category) {
      case "customer-trip":
        return "Customer Trip";

      case "tour-moment":
        return "Tour Moment";

      case "vehicle":
        return "Vehicle";

      case "group-tour":
        return "Group Tour";

      case "special-moment":
        return "Special Moment";

      default:
        return item.category;
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-[#e1eaee] bg-white">
      {/* Image */}

      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl}
          alt={
            item.caption ||
            "Gallery image"
          }
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
        />

        {item.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            Featured
          </span>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            item.status ===
            "active"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {item.status ===
          "active"
            ? "Active"
            : "Inactive"}
        </span>
      </div>

      {/* Details */}

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#4c92aa]">
          {formatCategory()}
        </p>

        <h3 className="mt-2 min-h-[48px] font-serif text-xl text-[#06364a]">
          {item.caption ||
            "No caption"}
        </h3>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {/* Status */}

          <select
            value={item.status}
            disabled={
              isUpdating
            }
            onChange={(
              event
            ) =>
              onStatusChange(
                item,
                event.target
                  .value as AdminGalleryStatus
              )
            }
            className={`h-9 rounded-lg border-0 px-3 text-xs font-semibold outline-none ${
              item.status ===
              "active"
                ? "bg-green-50 text-green-600"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          {/* Featured */}

          <button
            type="button"
            disabled={
              isUpdating
            }
            onClick={() =>
              onFeaturedChange(
                item
              )
            }
            className={`h-9 rounded-lg px-3 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              item.featured
                ? "bg-yellow-50 text-yellow-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {item.featured
              ? "Featured"
              : "Not Featured"}
          </button>

          <div className="flex-1" />

          {/* Edit */}

          <button
            type="button"
            onClick={() =>
              onEdit(item)
            }
            aria-label="Edit gallery image"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dbe7eb] text-[#06364a] transition hover:bg-[#eef8fc]"
          >
            <Pencil
              size={16}
            />
          </button>

          {/* Delete */}

          <button
            type="button"
            disabled={
              isDeleting
            }
            onClick={() =>
              onDelete(item.id)
            }
            aria-label="Delete gallery image"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2
              size={16}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;