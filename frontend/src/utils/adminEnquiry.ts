import type {
  AdminEnquiry,
} from "@/services/adminEnquiryService";

/* =========================================
   DATE
========================================= */

export const formatAdminEnquiryDate = (
  value: string
) => {
  if (!value) {
    return "Not specified";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

/* =========================================
   DATE + TIME
========================================= */

export const formatAdminEnquiryDateTime = (
  value: string
) => {
  if (!value) {
    return "Not specified";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

/* =========================================
   SOURCE LABEL
========================================= */

export const getAdminEnquirySourceLabel = (
  source: AdminEnquiry["source"]
) => {
  switch (source) {
    case "trip":
      return "Plan Trip";

    case "destination":
      return "Destination";

    case "package":
      return "Package";

    case "cab":
      return "Cab";

    default:
      return "General";
  }
};