import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useAgency,
} from "@/context/AgencyContext";

const AboutStats = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } =
    useAgency();

  const about =
    agency?.about;

  if (!about) {
    return null;
  }

  /*
   * Do not display the
   * "Years of Experience" stat.
   */
  const visibleStats =
    about.stats.filter(
      (stat) =>
        stat.label
          .trim()
          .toLowerCase() !==
        "years of experience"
    );

  if (
    visibleStats.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-12 md:py-14"
      style={{
        backgroundImage:
          about.statsBackgroundImage
            ? `url('${about.statsBackgroundImage}')`
            : undefined,
      }}
    >
      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-[#06364a]/78" />

      <div className="relative z-10 mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 text-center text-white sm:grid-cols-2 ${
            visibleStats.length >= 4
              ? "lg:grid-cols-4"
              : visibleStats.length ===
                  3
                ? "lg:grid-cols-3"
                : visibleStats.length ===
                    2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-1"
          }`}
        >
          {visibleStats.map(
            (stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : index *
                        0.12,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          scale: 0.96,
                        }
                  }
                  whileInView={{
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration:
                      shouldReduceMotion
                        ? 0
                        : 0.9,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : index *
                          0.12,
                  }}
                  className="font-serif text-4xl font-bold sm:text-5xl"
                >
                  {stat.value}
                </motion.div>

                <p className="mt-2 text-sm font-medium text-white/90 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;