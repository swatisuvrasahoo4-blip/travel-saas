import Head from "next/head";
import {
  useEffect,
  useState,
} from "react";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import RecentEnquiries from "@/components/admin/dashboard/RecentEnquiries";
import TodaysTours from "@/components/admin/dashboard/TodaysTours";
import TourCalendar from "@/components/admin/dashboard/TourCalendar";

import {
  AdminDashboardResponse,
  getAdminDashboard,
} from "@/services/adminDashboardService";

const AdminDashboardPage = () => {
  const [
    dashboardData,
    setDashboardData,
  ] =
    useState<AdminDashboardResponse | null>(
      null
    );

  const [
    isLoadingDashboard,
    setIsLoadingDashboard,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    const loadDashboard =
      async () => {
        try {
          setIsLoadingDashboard(
            true
          );

          setError("");

          const response =
            await getAdminDashboard();

          setDashboardData(
            response
          );
        } catch {
          setError(
            "Unable to load dashboard data."
          );
        } finally {
          setIsLoadingDashboard(
            false
          );
        }
      };

    void loadDashboard();
  }, []);

  return (
    <>
      <Head>
        <title>
          Admin Dashboard
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Dashboard"
          subtitle="Overview of your travel operations."
        >
          <section>
            <div className="mb-7">
              <h2 className="font-serif text-3xl text-[#06364a]">
                Overview
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Monitor enquiries,
                bookings and current
                tour operations.
              </p>
            </div>

            {isLoadingDashboard ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d7e7ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading dashboard...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                {error}
              </div>
            ) : dashboardData ? (
              <>
                <DashboardStats
                  totalEnquiries={
                    dashboardData
                      .stats
                      .totalEnquiries
                  }
                  newEnquiries={
                    dashboardData
                      .stats
                      .newEnquiries
                  }
                  activeTours={
                    dashboardData
                      .stats
                      .activeTours
                  }
                  completedTours={
                    dashboardData
                      .stats
                      .completedTours
                  }
                  cancelledTours={
                    dashboardData
                      .stats
                      .cancelledTours
                  }
                />

                <div className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                  <TourCalendar
                    tours={
                      dashboardData
                        .calendarTours
                    }
                  />

                  <TodaysTours
                    tours={
                      dashboardData
                        .todaysTours
                    }
                  />
                </div>

                <div className="mt-7">
                  <RecentEnquiries
                    enquiries={
                      dashboardData
                        .recentEnquiries
                    }
                  />
                </div>
              </>
            ) : null}
          </section>
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminDashboardPage;