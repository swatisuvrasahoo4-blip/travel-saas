import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================
   CREATE TOUR
========================================= */

export interface CreateTourPayload {
  customerName: string;

  customerPhone: string;

  destination: string;

  pickupAddress: string;

  dropLocation: string;

  travellers: number;

  startDateTime: string;

  endDateTime: string;

  agreedPrice: number;

  advanceAmount?: number;

  advancePaid?: boolean;

  advancePaidAt?: string | null;

  vehicleName?: string;

  vehicleNumber: string;

  driverName?: string;

  driverPhone?: string;

  notes?: string;
}

export interface TourConflict {
  id: string;

  customerName: string;

  destination: string;

  vehicleNumber: string;

  startDateTime: string;

  endDateTime: string;

  status:
    | "confirmed"
    | "active";
}

export interface CreatedTour {
  id: string;

  enquiryId: string;

  customerName: string;

  destination: string;

  pickupAddress: string;

  dropLocation: string;

  travellers: number;

  startDateTime: string;

  endDateTime: string;

  vehicleName: string;

  vehicleNumber: string;

  status: "confirmed";
}

export interface CreateTourResponse {
  success: boolean;

  message: string;

  tour?: CreatedTour;

  conflict?: TourConflict;
}

export const createTourFromEnquiry =
  async (
    enquiryId: string,
    payload: CreateTourPayload,
    csrfToken: string
  ): Promise<CreateTourResponse> => {
    const response =
      await axios.post<CreateTourResponse>(
        `${API_URL}/admin-tours/from-enquiry/${enquiryId}`,
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
   VEHICLE AVAILABILITY
========================================= */

export interface VehicleAvailabilityPayload {
  vehicleNumber: string;

  startDateTime: string;

  endDateTime: string;
}

export interface VehicleAvailabilityConflict {
  tourId: string;

  customerName: string;

  customerPhone: string;

  destination: string;

  startDateTime: string;

  endDateTime: string;

  vehicleName: string;

  vehicleNumber: string;

  driverName: string;

  driverPhone: string;

  status:
    | "confirmed"
    | "active";
}

export interface VehicleAvailabilityResponse {
  success: boolean;

  available: boolean;

  message: string;

  vehicleNumber?: string;

  startDateTime?: string;

  endDateTime?: string;

  conflict?: VehicleAvailabilityConflict;
}

export const checkVehicleAvailability =
  async (
    payload: VehicleAvailabilityPayload,
    csrfToken: string
  ): Promise<VehicleAvailabilityResponse> => {
    const response =
      await axios.post<VehicleAvailabilityResponse>(
        `${API_URL}/admin-tours/check-vehicle-availability`,
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