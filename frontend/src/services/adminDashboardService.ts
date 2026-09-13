import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export interface DashboardStatsData {
  totalEnquiries: number;
  newEnquiries: number;
  activeTours: number;
  completedTours: number;
  cancelledTours: number;
}

export interface RecentEnquiryData {
  id: string;
  customerName: string;
  destination: string;
  phone: string;
  source:
    | "general"
    | "trip"
    | "destination"
    | "package";
  status:
    | "new"
    | "contacted"
    | "closed";
  createdAt: string;
}

export interface TodayTourData {
  id: string;
  destination: string;
  customerName: string;
  travellers: number;
  startTime: string;
  vehicleNumber?: string;
  status:
    | "confirmed"
    | "active";
}

export interface CalendarTourData {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status:
    | "confirmed"
    | "active"
    | "cancelled";
}

export interface AdminDashboardResponse {
  success: boolean;

  stats: DashboardStatsData;

  recentEnquiries: RecentEnquiryData[];

  todaysTours: TodayTourData[];

  calendarTours: CalendarTourData[];
}

export const getAdminDashboard =
  async (): Promise<AdminDashboardResponse> => {
    const response =
      await axios.get<AdminDashboardResponse>(
        `${API_URL}/admin-dashboard`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };