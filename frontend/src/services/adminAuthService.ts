import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin";
}

export interface AdminAgency {
  id: string;
  name: string;
  slug: string;
}

export interface AdminAuthResponse {
  success: boolean;
  message?: string;

  /*
   * Returned after successful login.
   * Later this will be sent with
   * protected admin write requests.
   */
  csrfToken?: string;

  admin?: AdminUser;
  agency?: AdminAgency;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
  hostname: string;
}

/* =========================================
   LOGIN
========================================= */

export const loginAdmin = async (
  payload: AdminLoginPayload
): Promise<AdminAuthResponse> => {
  const response =
    await axios.post<AdminAuthResponse>(
      `${API_URL}/admin-auth/login`,
      payload,
      {
        withCredentials: true,
      }
    );

  return response.data;
};

/* =========================================
   CURRENT ADMIN
========================================= */

export const getCurrentAdmin =
  async (): Promise<AdminAuthResponse> => {
    const response =
      await axios.get<AdminAuthResponse>(
        `${API_URL}/admin-auth/me`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

/* =========================================
   LOGOUT
========================================= */

export const logoutAdmin =
  async (): Promise<AdminAuthResponse> => {
    const response =
      await axios.post<AdminAuthResponse>(
        `${API_URL}/admin-auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

    return response.data;
  };