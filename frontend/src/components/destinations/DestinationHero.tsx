import type {
  Destination,
} from "@/services/destinationService";

import {
  motion,
  useReducedMotion,
} from "motion/react";

interface DestinationHeroProps {
  destination: Destination;
}

const DestinationHero = ({
  destination,
}: DestinationHeroProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      className="relative flex min-h-96 w-full items-center overflow-hidden bg-cover bg-center md:min-h-120"
      style={{
        backgroundImage: `url("${destination.heroImage}")`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">

          {/* Destination Name */}
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
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
          >
            {destination.name}
          </motion.h1>

          {/* Subtitle */}
          {destination.subtitle && (
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
                    : 0.22,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="mt-4 text-lg font-medium text-white/95 sm:text-xl md:text-2xl"
            >
              {destination.subtitle}
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
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.9,

              delay:
                shouldReduceMotion
                  ? 0
                  : 0.45,

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
            className="mt-5 h-1 w-20 rounded-full bg-orange-500"
          />
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;