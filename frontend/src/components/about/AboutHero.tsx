import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const AboutHero = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } = useAgency();

  const hero = agency?.about?.hero;

  if (!hero) {
    return null;
  }

  return (
    <section
      className="relative flex min-h-[420px] items-center overflow-hidden bg-cover bg-center md:min-h-[520px]"
      style={{
        backgroundImage: hero.image
          ? `url('${hero.image}')`
          : undefined,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/88 via-[#06364a]/55 to-[#06364a]/10" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
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
            className="font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
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
                  : 0.18,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-5 max-w-2xl text-sm leading-7 text-white/95 sm:text-base md:text-lg"
          >
            {hero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;