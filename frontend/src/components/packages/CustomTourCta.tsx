import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { ArrowRight } from "lucide-react";

import { useAgency } from "@/context/AgencyContext";

const CustomTourCta = () => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const cta =
    agency.packagesPage?.cta;

  if (
    !cta ||
    !cta.title ||
    !cta.image
  ) {
    return null;
  }

  return (
    <section className="bg-[#fffaf3] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 30,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
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
        className="relative mx-auto max-w-[1700px] overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage: `url('${cta.image}')`,
        }}
      >
        {/* Dynamic agency overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              90deg,
              ${agency.primaryColor}f2 0%,
              ${agency.primaryColor}d9 42%,
              ${agency.primaryColor}8c 72%,
              ${agency.primaryColor}4d 100%
            )`,
          }}
        />

        <div className="relative z-10 flex min-h-[340px] items-center px-6 py-12 sm:px-10 md:min-h-[380px] md:px-14 lg:px-20">
          <div className="max-w-2xl text-white">
            {cta.label && (
              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 15,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
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
                      : 0.1,
                }}
                className="text-xs font-bold uppercase tracking-[0.22em] md:text-sm"
                style={{
                  color:
                    agency.accentColor,
                }}
              >
                {cta.label}
              </motion.p>
            )}

            <motion.h2
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
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 1,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.18,
              }}
              className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              {cta.title}
            </motion.h2>

            {cta.description && (
              <motion.p
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 18,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 1,
                  delay:
                    shouldReduceMotion
                      ? 0
                      : 0.28,
                }}
                className="mt-5 max-w-xl text-sm leading-7 text-white/90 md:text-base"
              >
                {cta.description}
              </motion.p>
            )}

            {cta.buttonText &&
              cta.buttonLink && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 16,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration:
                      shouldReduceMotion
                        ? 0
                        : 1,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : 0.38,
                  }}
                  className="mt-7"
                >
                  <Link
                    href={
                      cta.buttonLink
                    }
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor:
                        agency.accentColor,
                    }}
                  >
                    {cta.buttonText}

                    <ArrowRight
                      size={17}
                    />
                  </Link>
                </motion.div>
              )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CustomTourCta;