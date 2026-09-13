import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

import type {
  AdminEnquiry,
  AdminEnquiryStatus,
} from "@/services/adminEnquiryService";

import {
  getAdminEnquiryById,
  updateAdminEnquiryStatus,
} from "@/services/adminEnquiryService";

interface UseAdminEnquiryDetailParams {
  enquiryId?: string;
}

export const useAdminEnquiryDetail = ({
  enquiryId,
}: UseAdminEnquiryDetailParams) => {
  const {
    csrfToken,
  } = useAdminAuth();

  const [
    enquiry,
    setEnquiry,
  ] = useState<AdminEnquiry | null>(
    null
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(
    Boolean(enquiryId)
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    isUpdatingStatus,
    setIsUpdatingStatus,
  ] = useState(false);

  const [
    statusMessage,
    setStatusMessage,
  ] = useState("");

  /* =========================================
     LOAD ENQUIRY
  ========================================= */

  const loadEnquiry =
    useCallback(
      async () => {
        if (!enquiryId) {
          return;
        }

        try {
          setIsLoading(true);
          setError("");

          const response =
            await getAdminEnquiryById(
              enquiryId
            );

          setEnquiry(
            response.enquiry
          );
        } catch {
          setError(
            "Unable to load enquiry."
          );
        } finally {
          setIsLoading(false);
        }
      },
      [enquiryId]
    );

  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    if (!enquiryId) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        void loadEnquiry();
      }, 0);

    return () => {
      window.clearTimeout(
        timer
      );
    };
  }, [
    enquiryId,
    loadEnquiry,
  ]);

  /* =========================================
     UPDATE STATUS
  ========================================= */

  const updateStatus =
    useCallback(
      async (
        status: AdminEnquiryStatus
      ) => {
        if (!enquiry) {
          return false;
        }

        /*
         * Admin write requests
         * require a CSRF token.
         */
        if (!csrfToken) {
          setStatusMessage(
            "Security token is unavailable. Please refresh the page and try again."
          );

          return false;
        }

        try {
          setIsUpdatingStatus(
            true
          );

          setStatusMessage("");

          const response =
            await updateAdminEnquiryStatus(
              enquiry.id,
              status,
              csrfToken
            );

          setEnquiry(
            (current) =>
              current
                ? {
                    ...current,

                    status:
                      response
                        .enquiry
                        .status,

                    updatedAt:
                      response
                        .enquiry
                        .updatedAt,
                  }
                : current
          );

          setStatusMessage(
            response.message
          );

          return true;
        } catch {
          setStatusMessage(
            "Unable to update enquiry status."
          );

          return false;
        } finally {
          setIsUpdatingStatus(
            false
          );
        }
      },
      [
        enquiry,
        csrfToken,
      ]
    );

  /* =========================================
     MARK CLOSED LOCALLY
  ========================================= */

  const markAsClosedLocally =
    useCallback(() => {
      setEnquiry(
        (current) =>
          current
            ? {
                ...current,
                status: "closed",
              }
            : current
      );
    }, []);

  return {
    enquiry,
    isLoading,
    error,
    isUpdatingStatus,
    statusMessage,
    updateStatus,
    markAsClosedLocally,

    reloadEnquiry:
      loadEnquiry,
  };
};