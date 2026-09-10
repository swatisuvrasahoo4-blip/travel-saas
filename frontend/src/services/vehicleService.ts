import axios from "axios";

import type { Vehicle } from "@/types/vehicle";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const getVehicles = async (
  hostname: string
): Promise<Vehicle[]> => {
  try {
    const url =
      `${API_URL}/vehicle/domain/${encodeURIComponent(
        hostname
      )}`;

    console.log(
      "Vehicle API URL:",
      url
    );

    const response =
      await axios.get(url);

    console.log(
      "Vehicle API response:",
      response.data
    );

    return response.data.vehicles;
  } catch (error) {
    if (
      axios.isAxiosError(error)
    ) {
      console.error(
        "Vehicle API error:",
        error.response?.status,
        error.response?.data ||
          error.message
      );
    } else {
      console.error(
        "Vehicle API error:",
        error
      );
    }

    throw error;
  }
};