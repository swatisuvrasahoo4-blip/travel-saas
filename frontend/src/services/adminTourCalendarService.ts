import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export type CalendarTourStatus =
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled"
  | "closed";

export interface AdminCalendarTour {
  id: string;
  customerName: string;
  customerPhone: string;
  destination: string;
  pickupAddress: string;
  dropLocation: string;
  travellers: number;
  startDateTime: string;
  endDateTime: string;
  vehicleName: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  agreedPrice: number;
  advanceAmount: number;
  advancePaid: boolean;
  status: CalendarTourStatus;
  notes: string;
  completedAt?: string | null;
  cancelledAt?: string | null;
  cancellationReason?: string;
}

interface AdminTourCalendarResponse {
  success: boolean;
  tours: AdminCalendarTour[];
}

interface CancelAdminTourResponse {
  success: boolean;
  message: string;
  tour: {
    id: string;
    customerName: string;
    customerPhone: string;
    destination: string;
    vehicleName: string;
    vehicleNumber: string;
    startDateTime: string;
    endDateTime: string;
    status: "cancelled";
    cancelledAt: string;
    cancellationReason: string;
  };
}

interface CompleteAdminTourResponse {
  success: boolean;
  message: string;
  tour: {
    id: string;
    customerName: string;
    customerPhone: string;
    destination: string;
    vehicleName: string;
    vehicleNumber: string;
    startDateTime: string;
    endDateTime: string;
    status: "completed";
    completedAt: string;
  };
}

/* =========================================
   GET TOUR CALENDAR
========================================= */

export const getAdminTourCalendar =
  async (): Promise<
    AdminCalendarTour[]
  > => {
    const response =
      await axios.get<AdminTourCalendarResponse>(
        `${API_URL}/admin-tour-calendar`,
        {
          withCredentials: true,
        }
      );

    return response.data.tours;
  };

/* =========================================
   COMPLETE TOUR
========================================= */

export const completeAdminTour =
  async (
    tourId: string,
    csrfToken: string
  ): Promise<CompleteAdminTourResponse> => {
    const response =
      await axios.patch<CompleteAdminTourResponse>(
        `${API_URL}/admin-tours/${tourId}/complete`,
        {},
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
   CANCEL TOUR
========================================= */

export const cancelAdminTour =
  async (
    tourId: string,
    cancellationReason: string,
    csrfToken: string
  ): Promise<CancelAdminTourResponse> => {
    const response =
      await axios.patch<CancelAdminTourResponse>(
        `${API_URL}/admin-tours/${tourId}/cancel`,
        {
          cancellationReason,
        },
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