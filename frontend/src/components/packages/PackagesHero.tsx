import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useAgency,
} from "@/context/AgencyContext";

const PackagesHero = () => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading) {
    return (
      <section className="min-h-80 bg-gray-100" />
    );
  }

  if (!agency) {
    return null;
  }

  return (
    <section
      className="relative flex min-h-80 items-center overflow-hidden bg-cover bg-center sm:min-h-96 md:min-h-[430px]"
      style={{
        backgroundImage: `url("${
          agency.heroImage ||
          "/images/hero.png"
        }")`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/90 via-[#06364a]/70 to-[#06364a]/25" />

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
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
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.7,
            }}
            className="text-sm font-bold uppercase tracking-[0.2em]"
            style={{
              color:
                agency.accentColor,
            }}
          >
            Explore Our Tours
          </motion.p>

          <motion.h1
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
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
                  : 0.85,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.1,
            }}
            className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            Tour Packages
          </motion.h1>

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
                  : 0.8,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.2,
            }}
            className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base"
          >
            Discover carefully planned
            journeys, beautiful
            destinations and memorable
            travel experiences with{" "}
            {agency.name}.
          </motion.p>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.7,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.3,
            }}
            style={{
              backgroundColor:
                agency.accentColor,
              transformOrigin: "left",
            }}
            className="mt-5 h-1 w-20 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;