import type {
  CreatedTour,
  CreateTourPayload,
} from "@/services/adminTourService";

interface BuildWhatsAppBookingMessageParams {
  tour: CreatedTour;

  booking: CreateTourPayload;

  agencyName?: string;
}

const formatDateTime = (
  value: string
) => {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(date);
};

const formatCurrency = (
  amount: number
) =>
  new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);

export const buildWhatsAppBookingMessage = ({
  tour,
  booking,
  agencyName = "Travel Agency",
}: BuildWhatsAppBookingMessageParams) => {
  const agreedPrice =
    booking.agreedPrice ?? 0;

  const advanceAmount =
    booking.advanceAmount ?? 0;

  const balanceAmount =
    Math.max(
      agreedPrice -
        advanceAmount,
      0
    );

  const lines = [
    `Hello ${tour.customerName},`,
    "",
    `Your tour booking with ${agencyName} has been confirmed.`,
    "",
    "Booking Details",
    `Destination: ${tour.destination}`,
    `Pickup: ${tour.pickupAddress}`,
    `Drop: ${tour.dropLocation}`,
    `Travellers: ${tour.travellers}`,
    `Start: ${formatDateTime(
      tour.startDateTime
    )}`,
    `End: ${formatDateTime(
      tour.endDateTime
    )}`,
    "",
    "Vehicle Details",
    `Vehicle: ${
      tour.vehicleName ||
      booking.vehicleName ||
      "Not specified"
    }`,
    `Vehicle Number: ${tour.vehicleNumber}`,
  ];

  if (
    booking.driverName
      ?.trim()
  ) {
    lines.push(
      `Driver: ${booking.driverName.trim()}`
    );
  }

  if (
    booking.driverPhone
      ?.trim()
  ) {
    lines.push(
      `Driver Contact: ${booking.driverPhone.trim()}`
    );
  }

  lines.push(
    "",
    "Payment Details",
    `Total Amount: ${formatCurrency(
      agreedPrice
    )}`,
    `Advance Amount: ${formatCurrency(
      advanceAmount
    )}`,
    `Balance Amount: ${formatCurrency(
      balanceAmount
    )}`,
    `Advance Status: ${
      booking.advancePaid
        ? "Paid"
        : "Pending"
    }`
  );

  if (
    booking.notes?.trim()
  ) {
    lines.push(
      "",
      `Note: ${booking.notes.trim()}`
    );
  }

  lines.push(
    "",
    `Thank you for choosing ${agencyName}.`
  );

  return lines.join("\n");
};

export const normalizeWhatsAppPhone = (
  phone: string
) => {
  const digits =
    phone.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (
    digits.length === 10
  ) {
    return `91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return digits;
  }

  return digits;
};

export const buildWhatsAppUrl = (
  phone: string,
  message: string
) => {
  const normalizedPhone =
    normalizeWhatsAppPhone(
      phone
    );

  const encodedMessage =
    encodeURIComponent(
      message
    );

  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
};