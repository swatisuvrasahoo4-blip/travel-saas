import {
  ImageIcon,
} from "lucide-react";

import {
  AdminGalleryItem,
  AdminGalleryStatus,
} from "@/services/adminGalleryService";

import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  items: AdminGalleryItem[];

  isLoading: boolean;

  updatingItemId:
    | string
    | null;

  deletingItemId:
    | string
    | null;

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

const GalleryGrid = ({
  items,
  isLoading,
  updatingItemId,
  deletingItemId,
  onEdit,
  onStatusChange,
  onFeaturedChange,
  onDelete,
}: GalleryGridProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

          <p className="text-sm font-medium text-[#52727f]">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  if (
    items.length === 0
  ) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#e1eaee] bg-white px-4 text-center">
        <ImageIcon
          size={36}
          className="mb-3 text-slate-300"
        />

        <p className="font-semibold text-[#06364a]">
          No gallery images yet
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Add images to display
          travel moments on the
          website.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map(
        (item) => (
          <GalleryCard
            key={item.id}
            item={item}
            isUpdating={
              updatingItemId ===
              item.id
            }
            isDeleting={
              deletingItemId ===
              item.id
            }
            onEdit={onEdit}
            onStatusChange={
              onStatusChange
            }
            onFeaturedChange={
              onFeaturedChange
            }
            onDelete={
              onDelete
            }
          />
        )
      )}
    </div>
  );
};

export default GalleryGrid;