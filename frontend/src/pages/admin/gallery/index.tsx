import Head from "next/head";

import {
  Plus,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import GalleryFilters from "@/components/admin/gallery/GalleryFilters";
import GalleryForm from "@/components/admin/gallery/GalleryForm";
import GalleryGrid from "@/components/admin/gallery/GalleryGrid";

import { useAdminAuth } from "@/context/AdminAuthContext";

import {
  AdminGalleryCategory,
  AdminGalleryItem,
  AdminGalleryStatus,
  deleteAdminGalleryItem,
  getAdminGallery,
  updateAdminGalleryItem,
} from "@/services/adminGalleryService";

type StatusFilter =
  | "all"
  | AdminGalleryStatus;

type CategoryFilter =
  | "all"
  | AdminGalleryCategory;

const AdminGalleryPage = () => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    galleryItems,
    setGalleryItems,
  ] = useState<
    AdminGalleryItem[]
  >([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>(
    "all"
  );

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState<CategoryFilter>(
    "all"
  );

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    updatingItemId,
    setUpdatingItemId,
  ] = useState<
    string | null
  >(null);

  const [
    deletingItemId,
    setDeletingItemId,
  ] = useState<
    string | null
  >(null);

  /* =========================================
     LOAD GALLERY
  ========================================= */

  useEffect(() => {
    const loadGallery =
      async () => {
        try {
          setIsLoading(
            true
          );

          setError("");

          const response =
            await getAdminGallery();

          setGalleryItems(
            response.galleryItems
          );
        } catch {
          setError(
            "Unable to load gallery."
          );
        } finally {
          setIsLoading(
            false
          );
        }
      };

    void loadGallery();
  }, []);

  /* =========================================
     FILTERED GALLERY
  ========================================= */

  const filteredGallery =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return galleryItems.filter(
        (item) => {
          const matchesSearch =
            !query ||
            item.caption
              .toLowerCase()
              .includes(query) ||
            item.imageUrl
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "all" ||
            item.status ===
              statusFilter;

          const matchesCategory =
            categoryFilter ===
              "all" ||
            item.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
          );
        }
      );
    }, [
      galleryItems,
      search,
      statusFilter,
      categoryFilter,
    ]);

  /* =========================================
     CREATED ITEMS
  ========================================= */

  const handleCreated = (
    items:
      AdminGalleryItem[]
  ) => {
    setGalleryItems(
      (currentItems) => [
        ...items,
        ...currentItems,
      ]
    );

    setShowForm(false);

    setError("");

    setSuccessMessage(
      items.length === 1
        ? "Gallery image uploaded successfully."
        : `${items.length} gallery images uploaded successfully.`
    );
  };

  /* =========================================
     STATUS
  ========================================= */

  const handleStatusChange =
    async (
      item:
        AdminGalleryItem,
      status:
        AdminGalleryStatus
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      try {
        setUpdatingItemId(
          item.id
        );

        setError("");
        setSuccessMessage("");

        const response =
          await updateAdminGalleryItem(
            item.id,
            {
              status,
            },
            csrfToken
          );

        setGalleryItems(
          (currentItems) =>
            currentItems.map(
              (
                currentItem
              ) =>
                currentItem.id ===
                item.id
                  ? response.galleryItem
                  : currentItem
            )
        );
      } catch {
        setError(
          "Unable to update gallery status."
        );
      } finally {
        setUpdatingItemId(
          null
        );
      }
    };

  /* =========================================
     FEATURED
  ========================================= */

  const handleFeaturedChange =
    async (
      item:
        AdminGalleryItem
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      try {
        setUpdatingItemId(
          item.id
        );

        setError("");
        setSuccessMessage("");

        const response =
          await updateAdminGalleryItem(
            item.id,
            {
              featured:
                !item.featured,
            },
            csrfToken
          );

        setGalleryItems(
          (currentItems) =>
            currentItems.map(
              (
                currentItem
              ) =>
                currentItem.id ===
                item.id
                  ? response.galleryItem
                  : currentItem
            )
        );
      } catch {
        setError(
          "Unable to update featured status."
        );
      } finally {
        setUpdatingItemId(
          null
        );
      }
    };

  /* =========================================
     EDIT
  ========================================= */

  const handleEdit = (
    item:
      AdminGalleryItem
  ) => {
    /*
     * We will create the separate
     * edit component next.
     */
    console.log(
      "Edit gallery item:",
      item
    );
  };

  /* =========================================
     DELETE
  ========================================= */

  const handleDelete =
    async (
      itemId: string
    ) => {
      if (!csrfToken) {
        setError(
          "Security token is unavailable. Please refresh the page."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this gallery image?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingItemId(
          itemId
        );

        setError("");
        setSuccessMessage("");

        await deleteAdminGalleryItem(
          itemId,
          csrfToken
        );

        setGalleryItems(
          (
            currentItems
          ) =>
            currentItems.filter(
              (item) =>
                item.id !==
                itemId
            )
        );

        setSuccessMessage(
          "Gallery image deleted successfully."
        );
      } catch {
        setError(
          "Unable to delete gallery image."
        );
      } finally {
        setDeletingItemId(
          null
        );
      }
    };

  return (
    <>
      <Head>
        <title>
          Gallery | Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Gallery"
          subtitle="Manage gallery images and travel moments."
        >
          <section>
            {/* Header */}

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl text-[#06364a]">
                  Gallery
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Upload and
                  manage images
                  displayed on
                  your travel
                  website.
                </p>
              </div>

              {!showForm && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(
                      true
                    );

                    setError("");

                    setSuccessMessage(
                      ""
                    );
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#06364a] px-5 text-sm font-semibold text-white transition hover:bg-[#0a4a62]"
                >
                  <Plus
                    size={17}
                  />

                  Add Images
                </button>
              )}
            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}

            {successMessage && (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {
                  successMessage
                }
              </div>
            )}

            {/* Upload Form */}

            {showForm && (
              <div className="mb-6">
                <GalleryForm
                  csrfToken={
                    csrfToken ||
                    ""
                  }
                  onCreated={
                    handleCreated
                  }
                  onCancel={() =>
                    setShowForm(
                      false
                    )
                  }
                />
              </div>
            )}

            {/* Filters */}

            <GalleryFilters
              search={search}
              statusFilter={
                statusFilter
              }
              categoryFilter={
                categoryFilter
              }
              onSearchChange={
                setSearch
              }
              onStatusChange={
                setStatusFilter
              }
              onCategoryChange={
                setCategoryFilter
              }
            />

            {/* Gallery */}

            <GalleryGrid
              items={
                filteredGallery
              }
              isLoading={
                isLoading
              }
              updatingItemId={
                updatingItemId
              }
              deletingItemId={
                deletingItemId
              }
              onEdit={
                handleEdit
              }
              onStatusChange={
                handleStatusChange
              }
              onFeaturedChange={
                handleFeaturedChange
              }
              onDelete={
                handleDelete
              }
            />
          </section>
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminGalleryPage;