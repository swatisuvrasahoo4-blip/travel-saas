import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAdminTourCalendar,
  type AdminCalendarTour,
} from "@/services/adminTourCalendarService";

import {
  doesTourOverlapDay,
  getCalendarDays,
} from "@/utils/tourCalendar";

export const useAdminTourCalendar =
  () => {
    const [
      tours,
      setTours,
    ] = useState<
      AdminCalendarTour[]
    >([]);

    const [
      isLoading,
      setIsLoading,
    ] = useState(true);

    const [
      error,
      setError,
    ] = useState("");

    const [
      currentMonth,
      setCurrentMonth,
    ] = useState(() => {
      const today =
        new Date();

      return new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
    });

    const [
      selectedDate,
      setSelectedDate,
    ] = useState(
      new Date()
    );

    const [
      selectedTour,
      setSelectedTour,
    ] =
      useState<AdminCalendarTour | null>(
        null
      );

    /* =====================================
       REFRESH TOURS
    ===================================== */

    const refreshTours =
      useCallback(
        async () => {
          try {
            setError("");

            const data =
              await getAdminTourCalendar();

            setTours(data);
          } catch (
            loadError
          ) {
            console.error(
              "Calendar load error:",
              loadError
            );

            setError(
              "Unable to load tour calendar."
            );
          }
        },
        []
      );

    /* =====================================
       INITIAL FETCH
    ===================================== */

    useEffect(() => {
      const loadTours =
        async () => {
          try {
            setIsLoading(
              true
            );

            await refreshTours();
          } finally {
            setIsLoading(
              false
            );
          }
        };

      void loadTours();
    }, [refreshTours]);

    /* =====================================
       CALENDAR DAYS
    ===================================== */

    const calendarDays =
      useMemo(() => {
        return getCalendarDays(
          currentMonth
        );
      }, [
        currentMonth,
      ]);

    /* =====================================
       SELECTED DAY TOURS
    ===================================== */

    const selectedDateTours =
      useMemo(() => {
        return tours
          .filter(
            (tour) =>
              doesTourOverlapDay(
                tour,
                selectedDate
              )
          )
          .sort(
            (
              first,
              second
            ) =>
              new Date(
                first.startDateTime
              ).getTime() -
              new Date(
                second.startDateTime
              ).getTime()
          );
      }, [
        tours,
        selectedDate,
      ]);

    /* =====================================
       MONTH NAVIGATION
    ===================================== */

    const goPreviousMonth =
      () => {
        setCurrentMonth(
          (current) =>
            new Date(
              current.getFullYear(),
              current.getMonth() -
                1,
              1
            )
        );
      };

    const goNextMonth =
      () => {
        setCurrentMonth(
          (current) =>
            new Date(
              current.getFullYear(),
              current.getMonth() +
                1,
              1
            )
        );
      };

    const goToday = () => {
      const today =
        new Date();

      setCurrentMonth(
        new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        )
      );

      setSelectedDate(
        today
      );
    };

    return {
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
    };
  };