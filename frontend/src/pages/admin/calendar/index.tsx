import Head from "next/head";

import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";
import AdminLayout from "@/components/admin/layout/AdminLayout";

import CalendarHeader from "@/components/admin/calendar/CalendarHeader";
import CalendarGrid from "@/components/admin/calendar/CalendarGrid";
import SelectedDayTours from "@/components/admin/calendar/SelectedDayTours";
import CalendarLegend from "@/components/admin/calendar/CalendarLegend";
import TourDetailsModal from "@/components/admin/calendar/TourDetailsModal";

import {
  useAdminTourCalendar,
} from "@/hooks/useAdminTourCalendar";

const AdminCalendarPage = () => {
  const {
    tours,
    isLoading,
    error,
    currentMonth,
    selectedDate,
    selectedTour,
    calendarDays,
    selectedDateTours,

    setSelectedDate,
    setSelectedTour,

    refreshTours,

    goPreviousMonth,
    goNextMonth,
    goToday,
  } = useAdminTourCalendar();

  return (
    <>
      <Head>
        <title>
          Tour Calendar | Admin
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <ProtectedAdminRoute>
        <AdminLayout
          title="Tour Calendar"
          subtitle="View confirmed, active and cancelled tours."
        >
          <div className="space-y-6">
            <CalendarHeader
              currentMonth={
                currentMonth
              }
              onPrevious={
                goPreviousMonth
              }
              onNext={
                goNextMonth
              }
              onToday={
                goToday
              }
            />

            {isLoading ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#e1eaee] bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d8e8ed] border-t-[#06364a]" />

                  <p className="text-sm font-medium text-[#52727f]">
                    Loading tours...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-600">
                {error}
              </div>
            ) : (
              <>
                <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                  <CalendarGrid
                    currentMonth={
                      currentMonth
                    }
                    selectedDate={
                      selectedDate
                    }
                    calendarDays={
                      calendarDays
                    }
                    tours={tours}
                    onSelectDate={
                      setSelectedDate
                    }
                  />

                  <SelectedDayTours
                    selectedDate={
                      selectedDate
                    }
                    tours={
                      selectedDateTours
                    }
                    onSelectTour={
                      setSelectedTour
                    }
                  />
                </div>

                <CalendarLegend />
              </>
            )}
          </div>

          <TourDetailsModal
            tour={selectedTour}
            onClose={() =>
              setSelectedTour(
                null
              )
            }
            onCancelled={
              refreshTours
            }
          />
        </AdminLayout>
      </ProtectedAdminRoute>
    </>
  );
};

export default AdminCalendarPage;