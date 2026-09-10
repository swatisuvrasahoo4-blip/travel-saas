import {
  ArrowRight,
  Clock3,
  MapPin,
} from "lucide-react";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

import type {
  TourPackage,
} from "@/services/packageService";

interface TourPackageCardProps {
  tourPackage: TourPackage;
  index?: number;
  primaryColor: string;
  accentColor: string;
}

const TourPackageCard = ({
  tourPackage,
  index = 0,
  primaryColor,
  accentColor,
}: TourPackageCardProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  const {
    openEnquiry,
  } = useEnquiry();

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 34,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.22,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.78,
        delay:
          shouldReduceMotion
            ? 0
            : index * 0.13,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -7,
              scale: 1.012,
            }
      }
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image */}

      <Link
        href={`/packages/${tourPackage.slug}`}
        className="block"
      >
        <div className="relative h-40 overflow-hidden">
          <motion.img
            src={tourPackage.cardImage}
            alt={tourPackage.name}
            className="h-full w-full object-cover"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.07,
                  }
            }
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </Link>

      {/* Content */}

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/packages/${tourPackage.slug}`}
        >
          <h3
            className="text-lg font-bold leading-6 transition"
            style={{
              color: primaryColor,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color =
                accentColor;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color =
                primaryColor;
            }}
          >
            {tourPackage.name}
          </h3>
        </Link>

        <div className="mt-3 space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock3
              size={16}
              className="shrink-0"
              style={{
                color: accentColor,
              }}
            />

            <span>
              {tourPackage.duration}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin
              size={16}
              className="mt-0.5 shrink-0"
              style={{
                color: accentColor,
              }}
            />

            <span className="line-clamp-2">
              {tourPackage.destinations
                .map(
                  (destination) =>
                    destination.name
                )
                .join(", ")}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-1.5 border-t border-gray-100 pt-3">
            <Link
              href={`/packages/${tourPackage.slug}`}
              className="whitespace-nowrap text-xs font-semibold transition"
              style={{
                color: primaryColor,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color =
                  accentColor;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color =
                  primaryColor;
              }}
            >
              View Details
            </Link>

            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.04,
                      y: -1,
                    }
              }
              whileTap={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                    }
              }
              transition={{
                duration: 0.2,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  openEnquiry({
                    source: "package",
                    packageName:
                      tourPackage.name,
                    packageId:
                      tourPackage._id,
                  })
                }
                className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                style={{
                  backgroundColor:
                    accentColor,
                }}
              >
                Enquire Now

                <ArrowRight
                  size={13}
                />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default TourPackageCard;