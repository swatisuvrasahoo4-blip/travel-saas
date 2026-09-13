"use client";

import {
  MessageCircle,
  Pencil,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  CreatedTour,
  CreateTourPayload,
} from "@/services/adminTourService";

import {
  buildWhatsAppBookingMessage,
  buildWhatsAppUrl,
} from "@/utils/whatsappBooking";

interface WhatsAppBookingPreviewProps {
  tour: CreatedTour;

  booking: CreateTourPayload;

  customerPhone: string;

  agencyName?: string;

  onClose: () => void;

  onContinue: () => void;
}

const WhatsAppBookingPreview = ({
  tour,
  booking,
  customerPhone,
  agencyName = "Travel Agency",
  onClose,
  onContinue,
}: WhatsAppBookingPreviewProps) => {
  const [
    message,
    setMessage,
  ] = useState(() =>
    buildWhatsAppBookingMessage({
      tour,
      booking,
      agencyName,
    })
  );

  const handleSendWhatsApp =
    () => {
      if (!message.trim()) {
        return;
      }

      const whatsappUrl =
        buildWhatsAppUrl(
          customerPhone,
          message
        );

      window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );
    };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6">
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-[#e4ecef] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <MessageCircle
                size={22}
                className="text-green-600"
              />

              <h2 className="text-xl font-bold text-[#06364a]">
                WhatsApp Booking Confirmation
              </h2>
            </div>

            <p className="mt-1 text-sm text-[#647b85]">
              Review or edit the
              message before sending
              it to the customer.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#647b85] transition hover:bg-[#f2f7f9] hover:text-[#06364a]"
            aria-label="Close WhatsApp preview"
          >
            <X size={20} />
          </button>
        </div>

        {/* CUSTOMER */}

        <div className="border-b border-[#edf2f4] bg-[#f8fbfc] px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#78909a]">
            Sending to
          </p>

          <p className="mt-1 font-semibold text-[#06364a]">
            {tour.customerName}
          </p>

          <p className="text-sm text-[#5f7680]">
            {customerPhone}
          </p>
        </div>

        {/* MESSAGE */}

        <div className="px-6 py-6">
          <div className="mb-3 flex items-center gap-2">
            <Pencil
              size={16}
              className="text-[#ff681f]"
            />

            <label
              htmlFor="whatsapp-message"
              className="text-sm font-semibold text-[#06364a]"
            >
              Message Preview
            </label>
          </div>

          <textarea
            id="whatsapp-message"
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }
            rows={18}
            className="w-full resize-y rounded-2xl border border-[#dbe7eb] bg-white px-4 py-4 text-sm leading-6 text-[#284b59] outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
          />

          <p className="mt-2 text-xs text-[#78909a]">
            You can edit this
            message before opening
            WhatsApp.
          </p>
        </div>

        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-3 border-t border-[#e4ecef] px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onContinue}
            className="rounded-xl border border-[#d8e5e9] bg-white px-5 py-3 text-sm font-semibold text-[#06364a] transition hover:bg-[#f5fafb]"
          >
            Skip & Go to Calendar
          </button>

          <button
            type="button"
            onClick={
              handleSendWhatsApp
            }
            disabled={
              !message.trim()
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MessageCircle
              size={18}
            />

            Send on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBookingPreview;