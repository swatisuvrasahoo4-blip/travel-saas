import axiosInstance from "@/lib/axiosInstance";

export type TourHistoryStatus =
  | "completed"
  | "closed"
  | "cancelled";

export interface TourHistoryItem {
  _id: string;

  customerName: string;

  customerPhone: string;

  destination: string;

  pickupAddress: string;

  dropLocation: string;

  travellers: number;

  startDateTime: string;

  endDateTime: string;

  agreedPrice: number;

  advanceAmount: number;

  advancePaid: boolean;

  vehicleName: string;

  vehicleNumber: string;

  driverName: string;

  driverPhone: string;

  status: TourHistoryStatus;

  completedAt?: string | null;

  closedAt?: string | null;

  cancelledAt?: string | null;

  cancellationReason?: string;

  createdAt: string;

  updatedAt: string;
}

export interface TourHistoryDetails
  extends TourHistoryItem {
  enquiryId?: string | null;

  advancePaidAt?: string | null;

  notes: string;

  remainingAmount: number;
}

export interface TourHistorySummary {
  completed: number;

  closed: number;

  cancelled: number;

  total: number;
}

export interface TourHistoryPagination {
  page: number;

  limit: number;

  totalTours: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

export interface GetTourHistoryParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: TourHistoryStatus | "";

  fromDate?: string;

  toDate?: string;
}

export interface GetTourHistoryResponse {
  success: boolean;

  tours: TourHistoryItem[];

  summary: TourHistorySummary;

  pagination: TourHistoryPagination;
}

export interface GetTourHistoryByIdResponse {
  success: boolean;

  tour: TourHistoryDetails;
}

/* =========================================
   GET TOUR HISTORY LIST
========================================= */

export const getAdminTourHistory =
  async (
    params: GetTourHistoryParams = {}
  ): Promise<GetTourHistoryResponse> => {
    const response =
      await axiosInstance.get<GetTourHistoryResponse>(
        "/admin-tour-history",
        {
          params: {
            page:
              params.page ?? 1,

            limit:
              params.limit ?? 10,

            search:
              params.search?.trim() ||
              undefined,

            status:
              params.status ||
              undefined,

            fromDate:
              params.fromDate ||
              undefined,

            toDate:
              params.toDate ||
              undefined,
          },
        }
      );

    return response.data;
  };

/* =========================================
   GET SINGLE TOUR HISTORY RECORD
========================================= */

export const getAdminTourHistoryById =
  async (
    tourId: string
  ): Promise<GetTourHistoryByIdResponse> => {
    const response =
      await axiosInstance.get<GetTourHistoryByIdResponse>(
        `/admin-tour-history/${tourId}`
      );

    return response.data;
  };