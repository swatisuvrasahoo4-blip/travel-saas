import {
  CheckCircle2,
  UsersRound,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageReferenceInfoProps {
  tourPackage: TourPackage;
}

const PackageReferenceInfo = ({
  tourPackage,
}: PackageReferenceInfoProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              x: 30,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 1.1,

        delay:
          shouldReduceMotion
            ? 0
            : 0.18,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className="space-y-4"
    >
      {/* Tour Highlights */}
      <ReferenceCard
        title="Tour Highlights"
        primaryColor={
          agency.primaryColor
        }
      >
        <div className="space-y-1.5">
          {tourPackage.highlights.map(
            (highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{
                    color:
                      agency.accentColor,
                  }}
                />

                <span>
                  {highlight}
                </span>
              </div>
            )
          )}
        </div>
      </ReferenceCard>

      {/* Suitable For */}
      <ReferenceCard
        title="Suitable For"
        primaryColor={
          agency.primaryColor
        }
      >
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {tourPackage.suitableFor.map(
            (item) => (
              <div
                key={item}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  <UsersRound
                    size={25}
                    strokeWidth={1.7}
                  />
                </div>

                <p
                  className="mt-2 max-w-[85px] text-xs font-medium leading-4"
                  style={{
                    color:
                      agency.primaryColor,
                  }}
                >
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </ReferenceCard>
    </motion.div>
  );
};

/* =========================================
   REFERENCE CARD
========================================= */

interface ReferenceCardProps {
  title: string;
  children: React.ReactNode;
  primaryColor: string;
}

const ReferenceCard = ({
  title,
  children,
  primaryColor,
}: ReferenceCardProps) => {
  return (
    <div
      className="rounded-lg px-5 py-4"
      style={{
        backgroundColor: `${primaryColor}0d`,
      }}
    >
      <h3
        className="font-serif text-xl font-bold"
        style={{
          color: primaryColor,
        }}
      >
        {title}
      </h3>

      <div className="mt-3">
        {children}
      </div>
    </div>
  );
};

export default PackageReferenceInfo;