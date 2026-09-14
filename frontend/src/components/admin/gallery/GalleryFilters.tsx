import {
  AdminGalleryCategory,
  AdminGalleryStatus,
} from "@/services/adminGalleryService";

type StatusFilter =
  | "all"
  | AdminGalleryStatus;

type CategoryFilter =
  | "all"
  | AdminGalleryCategory;

interface GalleryFiltersProps {
  search: string;

  statusFilter:
    StatusFilter;

  categoryFilter:
    CategoryFilter;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: StatusFilter
  ) => void;

  onCategoryChange: (
    value: CategoryFilter
  ) => void;
}

const GalleryFilters = ({
  search,
  statusFilter,
  categoryFilter,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
}: GalleryFiltersProps) => {
  return (
    <div className="mb-6 grid gap-3 rounded-2xl border border-[#e1eaee] bg-white p-4 md:grid-cols-[1fr_190px_190px]">
      {/* Search */}

      <input
        type="text"
        value={search}
        onChange={(event) =>
          onSearchChange(
            event.target.value
          )
        }
        placeholder="Search by caption or image URL..."
        className="h-11 rounded-xl border border-[#dbe7eb] px-4 text-sm outline-none transition focus:border-[#06364a]"
      />

      {/* Category */}

      <select
        value={
          categoryFilter
        }
        onChange={(event) =>
          onCategoryChange(
            event.target
              .value as CategoryFilter
          )
        }
        className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
      >
        <option value="all">
          All Categories
        </option>

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

      {/* Status */}

      <select
        value={
          statusFilter
        }
        onChange={(event) =>
          onStatusChange(
            event.target
              .value as StatusFilter
          )
        }
        className="h-11 rounded-xl border border-[#dbe7eb] bg-white px-3 text-sm outline-none focus:border-[#06364a]"
      >
        <option value="all">
          All Status
        </option>

        <option value="active">
          Active
        </option>

        <option value="inactive">
          Inactive
        </option>
      </select>
    </div>
  );
};

export default GalleryFilters;