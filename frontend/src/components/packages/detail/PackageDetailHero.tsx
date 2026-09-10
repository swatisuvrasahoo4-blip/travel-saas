import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageDetailHeroProps {
  tourPackage: TourPackage;
}

const PackageDetailHero = ({
  tourPackage,
}: PackageDetailHeroProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const heroLabel =
  agency.packageDetail?.label ||
  "Tour Package";

  return (
    <section
      className="relative min-h-[420px] bg-cover bg-[center_30%] md:min-h-[430px]"
      style={{
        backgroundImage: `url('${tourPackage.heroImage}')`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            90deg,
            ${agency.primaryColor}f2 0%,
            ${agency.primaryColor}99 55%,
            transparent 100%
          )`,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1700px] items-center px-4 py-12 sm:px-6 md:min-h-[430px] lg:px-8">
        <div className="max-w-3xl text-white">
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.9,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="text-xs font-medium uppercase tracking-wide md:text-sm"
            style={{
              color:
                agency.accentColor,
            }}
          >
            {heroLabel}
          </motion.p>

          <motion.h1
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 35,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1.1,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.12,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
          >
            {tourPackage.name}
          </motion.h1>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 25,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 1.1,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.28,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-2 font-serif text-2xl font-bold md:text-3xl"
          >
            {tourPackage.duration}
          </motion.p>

          {tourPackage.subtitle && (
            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 1.1,

                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.42,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mt-5 text-sm text-white/95 md:text-base"
            >
              {tourPackage.subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageDetailHero;