import {
  motion,
  useReducedMotion,
} from "motion/react";

import type { Agency } from "@/services/agencyService";

interface CabHeroProps {
  agency: Agency | null;
}

const CabHero = ({
  agency,
}: CabHeroProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      className="relative flex min-h-[360px] w-full items-center overflow-hidden bg-cover bg-center md:min-h-[430px]"
      style={{
        backgroundImage:
          "url('/images/cabs/cab-hero.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/90 via-[#06364a]/55 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          {/* Label */}
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.9,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4bc4ef] sm:text-sm"
          >
            Ride With Comfort
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 34,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 1.1,
              delay: shouldReduceMotion
                ? 0
                : 0.12,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Cab Services
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 1.1,
              delay: shouldReduceMotion
                ? 0
                : 0.3,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-4 max-w-xl text-sm leading-6 text-white/95 sm:text-base md:text-lg"
          >
            Travel comfortably with reliable
            vehicles and experienced drivers
            for every journey.
          </motion.p>

          {/* Agency */}
          {agency?.name && (
            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : 0.8,
                delay: shouldReduceMotion
                  ? 0
                  : 0.4,
              }}
              className="mt-4 text-sm font-medium text-white/90"
            >
              By {agency.name}
            </motion.p>
          )}

          {/* Accent Line */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            animate={{
              scaleX: 1,
              opacity: 1,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.9,
              delay: shouldReduceMotion
                ? 0
                : 0.5,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin: "left",
            }}
            className="mt-5 h-1 w-20 rounded-full bg-[#ff681f]"
          />
        </div>
      </div>
    </section>
  );
};

export default CabHero;