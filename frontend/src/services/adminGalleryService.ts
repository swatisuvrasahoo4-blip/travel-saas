import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================
   TYPES
========================================= */

export type AdminGalleryCategory =
  | "customer-trip"
  | "tour-moment"
  | "vehicle"
  | "group-tour"
  | "special-moment";

export type AdminGalleryStatus =
  | "active"
  | "inactive";

export interface AdminGalleryItem {
  id: string;

  imageUrl: string;
  caption: string;

  category: AdminGalleryCategory;

  featured: boolean;
  featuredOrder: number;

  status: AdminGalleryStatus;

  createdAt: string;
  updatedAt: string;
}

export interface AdminGalleryResponse {
  success: boolean;
  galleryItems: AdminGalleryItem[];
}

export interface AdminGalleryItemResponse {
  success: boolean;
  galleryItem: AdminGalleryItem;
}

export interface AdminGalleryMutationResponse {
  success: boolean;
  message: string;
  galleryItem: AdminGalleryItem;
}

export interface DeleteAdminGalleryResponse {
  success: boolean;
  message: string;
}

export interface CreateAdminGalleryPayload {
  imageUrl: string;
  caption: string;
  category: AdminGalleryCategory;
  featured: boolean;
  featuredOrder: number;
  status: AdminGalleryStatus;
}

export interface UpdateAdminGalleryPayload {
  imageUrl?: string;
  caption?: string;
  category?: AdminGalleryCategory;
  featured?: boolean;
  featuredOrder?: number;
  status?: AdminGalleryStatus;
}

export interface UploadedGalleryImage {
  imageUrl: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  originalName: string;
}

export interface UploadGalleryImagesResponse {
  success: boolean;
  message: string;
  images: UploadedGalleryImage[];
}

/* =========================================
   GET ALL GALLERY ITEMS
========================================= */

export const getAdminGallery =
  async (): Promise<AdminGalleryResponse> => {
    const response =
      await axios.get<AdminGalleryResponse>(
        `${API_URL}/admin-gallery`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/* =========================================
   GET SINGLE GALLERY ITEM
========================================= */

export const getAdminGalleryItemById =
  async (
    galleryItemId: string
  ): Promise<AdminGalleryItemResponse> => {
    const response =
      await axios.get<AdminGalleryItemResponse>(
        `${API_URL}/admin-gallery/${galleryItemId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/* =========================================
   UPLOAD GALLERY IMAGES
========================================= */

export const uploadAdminGalleryImages =
  async (
    files: File[],
    csrfToken: string
  ): Promise<UploadGalleryImagesResponse> => {
    const formData =
      new FormData();

    files.forEach(
      (file) => {
        formData.append(
          "images",
          file
        );
      }
    );

    const response =
      await axios.post<UploadGalleryImagesResponse>(
        `${API_URL}/admin-gallery/upload`,
        formData,
        {
          withCredentials: true,

          headers: {
            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };

/* =========================================
   CREATE GALLERY ITEM
========================================= */

export const createAdminGalleryItem =
  async (
    payload: CreateAdminGalleryPayload,
    csrfToken: string
  ): Promise<AdminGalleryMutationResponse> => {
    const response =
      await axios.post<AdminGalleryMutationResponse>(
        `${API_URL}/admin-gallery`,
        payload,
        {
          withCredentials: true,

          headers: {
            "Content-Type":
              "application/json",

            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };

/* =========================================
   UPDATE GALLERY ITEM
========================================= */

export const updateAdminGalleryItem =
  async (
    galleryItemId: string,
    payload: UpdateAdminGalleryPayload,
    csrfToken: string
  ): Promise<AdminGalleryMutationResponse> => {
    const response =
      await axios.patch<AdminGalleryMutationResponse>(
        `${API_URL}/admin-gallery/${galleryItemId}`,
        payload,
        {
          withCredentials: true,

          headers: {
            "Content-Type":
              "application/json",

            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };

/* =========================================
   DELETE GALLERY ITEM
========================================= */

export const deleteAdminGalleryItem =
  async (
    galleryItemId: string,
    csrfToken: string
  ): Promise<DeleteAdminGalleryResponse> => {
    const response =
      await axios.delete<DeleteAdminGalleryResponse>(
        `${API_URL}/admin-gallery/${galleryItemId}`,
        {
          withCredentials: true,

          headers: {
            "X-CSRF-Token":
              csrfToken,
          },
        }
      );

    return response.data;
  };