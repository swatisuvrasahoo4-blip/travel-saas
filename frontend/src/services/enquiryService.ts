import axios from "axios";

import type {
  EnquirySource,
} from "@/components/enquiry/EnquiryProvider";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export interface CreateEnquiryPayload {
  hostname: string;
  source: EnquirySource;

  packageId?: string;
  packageName?: string;

  name: string;
  phone: string;
  email?: string;

  destination?: string;
  travelDate?: string;
  travellers?: string;
  tripType?: string;
  message?: string;
}

interface CreateEnquiryResponse {
  message: string;

  enquiry: {
    _id: string;
  };
}

export const createEnquiry = async (
  payload: CreateEnquiryPayload
): Promise<CreateEnquiryResponse> => {
  const response =
    await axios.post<CreateEnquiryResponse>(
      `${API_URL}/enquiry`,
      payload
    );

  return response.data;
};