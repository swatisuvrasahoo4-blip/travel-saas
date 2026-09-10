import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const AboutCta = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } = useAgency();

  const cta = agency?.about?.cta;

  if (!cta) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-16 md:py-20"
      style={{
        backgroundImage: cta.image
          ? `url('${cta.image}')`
          : undefined,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/90 via-[#06364a]/65 to-[#06364a]/25" />

      <div className="relative z-10 mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -38,
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
                : 1.1,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="max-w-2xl text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4bc4ef]">
            {cta.label}
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {cta.title}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 md:text-base">
            {cta.description}
          </p>

          {cta.buttonText &&
            cta.buttonLink && (
              <Link
                href={cta.buttonLink}
                className="mt-7 inline-flex items-center rounded-lg bg-[#ff681f] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-[#e85b17]"
              >
                {cta.buttonText}
              </Link>
            )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCta;