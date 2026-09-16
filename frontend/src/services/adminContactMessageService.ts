import axiosInstance from "@/lib/axiosInstance";

export type ContactMessageStatus =
  | "new"
  | "read";

export interface AdminContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactMessagePagination {
  page: number;
  limit: number;
  totalMessages: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetContactMessagesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ContactMessageStatus | "";
}

export interface GetContactMessagesResponse {
  success: boolean;
  messages: AdminContactMessage[];
  unreadCount: number;
  pagination: ContactMessagePagination;
}

export interface GetContactMessageResponse {
  success: boolean;
  contactMessage: AdminContactMessage;
}

export interface DeleteContactMessageResponse {
  success: boolean;
  message: string;
}

export const getAdminContactMessages =
  async (
    params: GetContactMessagesParams = {}
  ): Promise<GetContactMessagesResponse> => {
    const response =
      await axiosInstance.get<GetContactMessagesResponse>(
        "/admin-contact-messages",
        {
          params: {
            page: params.page ?? 1,
            limit: params.limit ?? 10,
            search:
              params.search?.trim() || undefined,
            status:
              params.status || undefined,
          },
        }
      );

    return response.data;
  };

export const getAdminContactMessageById =
  async (
    id: string
  ): Promise<GetContactMessageResponse> => {
    const response =
      await axiosInstance.get<GetContactMessageResponse>(
        `/admin-contact-messages/${id}`
      );

    return response.data;
  };

export const markAdminContactMessageAsRead =
  async (
    id: string
  ): Promise<GetContactMessageResponse> => {
    const response =
      await axiosInstance.patch<GetContactMessageResponse>(
        `/admin-contact-messages/${id}/read`,
        {}
      );

    return response.data;
  };

export const deleteAdminContactMessage =
  async (
    id: string
  ): Promise<DeleteContactMessageResponse> => {
    const response =
      await axiosInstance.delete<DeleteContactMessageResponse>(
        `/admin-contact-messages/${id}`
      );

    return response.data;
  };