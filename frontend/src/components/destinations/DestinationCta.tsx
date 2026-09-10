import {
  Send,
} from "lucide-react";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import type {
  Destination,
} from "@/services/destinationService";

interface DestinationCtaProps {
  destination: Destination;
}

const DestinationCta = ({
  destination,
}: DestinationCtaProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  if (!destination.ctaImage) {
    return null;
  }

  return (
    <section
      className="relative flex min-h-72 items-center overflow-hidden bg-cover bg-center md:min-h-80"
      style={{
        backgroundImage: `url("${destination.ctaImage}")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#06364a]/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.h2
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 30,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1.1,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="text-2xl font-bold text-white sm:text-3xl md:text-4xl"
        >
          Plan Your Trip to{" "}
          {destination.name}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1.1,

            delay:
              shouldReduceMotion
                ? 0
                : 0.22,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base"
        >
          Tell us your travel dates and
          preferences, and we&apos;ll help
          you plan a memorable journey.
        </motion.p>

        {/* Enquire Button - No Motion Animation */}
        <div className="mt-6">
          <Link
            href={`/enquiry?destination=${encodeURIComponent(
              destination.name
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-colors duration-200 hover:bg-orange-700"
          >
            <Send size={18} />
            Enquire Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationCta;