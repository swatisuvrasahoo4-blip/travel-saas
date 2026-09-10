import axios from "axios";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
  console.warn(
    "NEXT_PUBLIC_BACKEND_URL is not configured"
  );
}

export interface ContactMessagePayload {
  hostname: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactMessageResponse {
  success: boolean;
  message: string;
  contactMessage?: {
    _id: string;
  };
}

export const sendContactMessage = async (
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> => {
  if (!BACKEND_URL) {
    throw new Error(
      "Backend URL is not configured"
    );
  }

  const response =
    await axios.post<ContactMessageResponse>(
      `${BACKEND_URL}/contact-message`,
      payload
    );

  return response.data;
};