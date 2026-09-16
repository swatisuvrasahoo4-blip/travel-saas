import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,

  /*
   * Required because the admin JWT and
   * CSRF token are stored in cookies.
   */
  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

/*
 * Read a cookie safely in the browser.
 */
const getCookie = (
  name: string
): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies =
    document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, ...cookieValue] =
      cookie.trim().split("=");

    if (cookieName === name) {
      return decodeURIComponent(
        cookieValue.join("=")
      );
    }
  }

  return null;
};

/*
 * Automatically attach the CSRF token
 * to requests that modify server data.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const method =
      config.method?.toLowerCase();

    const requiresCsrf =
      method === "post" ||
      method === "put" ||
      method === "patch" ||
      method === "delete";

    if (requiresCsrf) {
      const csrfToken =
        getCookie("admin_csrf");

      if (csrfToken) {
        config.headers.set(
          "X-CSRF-Token",
          csrfToken
        );
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;