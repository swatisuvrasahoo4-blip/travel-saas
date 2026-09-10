import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageCustomizeCtaProps {
  tourPackage: TourPackage;
}

const PackageCustomizeCta = ({
  tourPackage,
}: PackageCustomizeCtaProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const detailCta =
    agency.packageDetail?.cta;

  if (!detailCta) {
    return null;
  }

  const backgroundImage =
    detailCta.image ||
    tourPackage.heroImage;

  return (
    <section className="mt-4 md:mt-6 mb-0">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
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
            amount: 0.25,
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
          className="relative overflow-hidden rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `${agency.primaryColor}d9`,
            }}
          />

          <div className="relative z-10 px-5 py-8 text-center text-white sm:px-8 md:py-10">
            {detailCta.label && (
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
                      : 0.12,
                }}
                className="text-xs font-medium uppercase tracking-wide md:text-sm"
                style={{
                  color:
                    agency.accentColor,
                }}
              >
                {detailCta.label}
              </motion.p>
            )}

            {detailCta.title && (
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
                      : 0.2,
                }}
                className="mt-3 font-serif text-2xl font-bold md:text-4xl"
              >
                {detailCta.title}
              </motion.h2>
            )}

            {detailCta.description && (
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
                      : 1,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : 0.3,
                }}
                className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 md:text-base"
              >
                {detailCta.description}
              </motion.p>
            )}

            {detailCta.buttonText &&
              detailCta.buttonLink && (
                <motion.div
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
                        : 1,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : 0.4,
                  }}
                  className="mt-6"
                >
                  <Link
                    href={
                      detailCta.buttonLink
                    }
                    className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-bold transition hover:opacity-90"
                    style={{
                      backgroundColor:
                        agency.accentColor,

                      color:
                        agency.primaryColor,
                    }}
                  >
                    {
                      detailCta.buttonText
                    }
                  </Link>
                </motion.div>
              )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageCustomizeCta;