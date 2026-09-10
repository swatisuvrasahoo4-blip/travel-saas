import {
  Phone,
} from "lucide-react";

import {
  FaWhatsapp,
} from "react-icons/fa";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useAgency,
} from "@/context/AgencyContext";

const FloatingContactButtons = () => {
  const { agency } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (!agency?.phones?.length) {
    return null;
  }

  const primaryPhone =
    agency.phones[0];

  const telephoneNumber =
    primaryPhone.replace(
      /[^\d+]/g,
      ""
    );

  const whatsappNumber =
    primaryPhone.replace(
      /\D/g,
      ""
    );

  return (
    <div className="fixed bottom-5 right-4 z-[100] flex flex-col gap-2.5 sm:bottom-6 sm:right-6">
      {/* Call */}

      <motion.a
        href={`tel:${telephoneNumber}`}
        aria-label={`Call ${agency.name}`}
        title={`Call ${primaryPhone}`}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.08,
                y: -2,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.94,
              }
        }
        className="group relative flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#06364a] text-white shadow-lg transition-shadow hover:shadow-xl"
      >
        <Phone
          size={20}
          strokeWidth={2.2}
        />

        <span className="pointer-events-none absolute right-[56px] hidden whitespace-nowrap rounded-lg bg-[#06364a] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
          Call Us
        </span>
      </motion.a>

      {/* WhatsApp */}

      <motion.a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${agency.name}`}
        title={`WhatsApp ${primaryPhone}`}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.08,
                y: -2,
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: 0.94,
              }
        }
        className="group relative flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl"
      >
        <FaWhatsapp
          size={23}
        />

        <span className="pointer-events-none absolute right-[56px] hidden whitespace-nowrap rounded-lg bg-[#1f2937] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 sm:block">
          WhatsApp
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingContactButtons;