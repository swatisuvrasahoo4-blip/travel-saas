import {
  ArrowRight,
  Bus,
  Clock3,
  MapPin,
  UsersRound,
} from "lucide-react";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageQuickInfoProps {
  tourPackage: TourPackage;
}

const PackageQuickInfo = ({
  tourPackage,
}: PackageQuickInfoProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const {
    openEnquiry,
  } = useEnquiry();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  return (
    <section
      className="py-4 md:py-5"
      style={{
        backgroundColor: `${agency.primaryColor}0d`,
      }}
    >
      <div className="mx-auto grid max-w-[1700px] items-center gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1fr_1.1fr_1.1fr_1.2fr_1.4fr] lg:px-8">
        <QuickInfo
          icon={Clock3}
          title="Duration"
          value={tourPackage.duration}
          index={0}
          shouldReduceMotion={
            shouldReduceMotion
          }
          primaryColor={
            agency.primaryColor
          }
        />

        <QuickInfo
          icon={MapPin}
          title="Destinations"
          value={tourPackage.destinations
            .map(
              (destination) =>
                destination.name
            )
            .join(", ")}
          index={1}
          shouldReduceMotion={
            shouldReduceMotion
          }
          primaryColor={
            agency.primaryColor
          }
        />

        <QuickInfo
          icon={UsersRound}
          title="Tour Type"
          value={
            tourPackage.tourTypes.length
              ? tourPackage.tourTypes.join(
                  " / "
                )
              : "Custom Tour"
          }
          index={2}
          shouldReduceMotion={
            shouldReduceMotion
          }
          primaryColor={
            agency.primaryColor
          }
        />

        <QuickInfo
          icon={Bus}
          title="Vehicle Options"
          value={
            tourPackage.vehicleOptions.length
              ? tourPackage.vehicleOptions.join(
                  " / "
                )
              : "On Request"
          }
          index={3}
          shouldReduceMotion={
            shouldReduceMotion
          }
          primaryColor={
            agency.primaryColor
          }
        />

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 25,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1,
            delay:
              shouldReduceMotion
                ? 0
                : 0.4,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="flex flex-col gap-2"
        >
          {/* Enquire Now */}

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
            className="flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            style={{
              backgroundColor:
                agency.accentColor,
            }}
          >
            Enquire Now

            <ArrowRight
              size={17}
            />
          </button>

          {/* Custom Trip */}

          <Link
            href="/plan-my-trip"
            className="flex items-center justify-center rounded-md border bg-white px-5 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{
              borderColor: `${agency.primaryColor}66`,
              color:
                agency.primaryColor,
            }}
          >
            Plan a Custom Trip
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================
   QUICK INFO ITEM
========================================= */

interface QuickInfoProps {
  icon: typeof Clock3;
  title: string;
  value: string;
  index: number;
  shouldReduceMotion:
    | boolean
    | null;
  primaryColor: string;
}

const QuickInfo = ({
  icon: Icon,
  title,
  value,
  index,
  shouldReduceMotion,
  primaryColor,
}: QuickInfoProps) => {
  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 0.9,
        delay:
          shouldReduceMotion
            ? 0
            : index * 0.1,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="flex items-center gap-3"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
        style={{
          color: primaryColor,
        }}
      >
        <Icon
          size={23}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
        <p
          className="text-sm font-bold"
          style={{
            color: primaryColor,
          }}
        >
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-700">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default PackageQuickInfo;