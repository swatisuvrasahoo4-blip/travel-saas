import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export type AdminEnquirySource =
  | "general"
  | "trip"
  | "destination"
  | "package"
  | "cab";

export type AdminEnquiryStatus =
  | "new"
  | "contacted"
  | "expired"
  | "closed";

export interface AdminEnquiry {
  id: string;
  source: AdminEnquirySource;
  packageId: string | null;
  packageName: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  fromDate: string;
  toDate: string;
  travellers: string;
  vehicleType: string;
  tripType: string;
  message: string;
  status: AdminEnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminEnquiriesResponse {
  success: boolean;
  enquiries: AdminEnquiry[];
}

export interface AdminEnquiryResponse {
  success: boolean;
  enquiry: AdminEnquiry;
}

export interface UpdateAdminEnquiryStatusResponse {
  success: boolean;
  message: string;

  enquiry: {
    id: string;
    status: AdminEnquiryStatus;
    updatedAt: string;
  };
}

export const getAdminEnquiries =
  async (): Promise<AdminEnquiriesResponse> => {
    const response =
      await axios.get<AdminEnquiriesResponse>(
        `${API_URL}/admin-enquiries`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

export const getAdminEnquiryById =
  async (
    enquiryId: string
  ): Promise<AdminEnquiryResponse> => {
    const response =
      await axios.get<AdminEnquiryResponse>(
        `${API_URL}/admin-enquiries/${enquiryId}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

export const updateAdminEnquiryStatus =
  async (
    enquiryId: string,
    status: AdminEnquiryStatus,
    csrfToken: string
  ): Promise<UpdateAdminEnquiryStatusResponse> => {
    const response =
      await axios.patch<UpdateAdminEnquiryStatusResponse>(
        `${API_URL}/admin-enquiries/${enquiryId}/status`,
        {
          status,
        },
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