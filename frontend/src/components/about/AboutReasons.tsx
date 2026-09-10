import {
  Award,
  Heart,
  MapPinned,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const iconMap = {
  users: Users,
  award: Award,
  "map-pinned": MapPinned,
  heart: Heart,
};

const AboutReasons = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } = useAgency();

  const about = agency?.about;

  if (!about || about.reasons.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-14 md:py-20">
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
          className="mx-auto max-w-3xl text-center"
        >
          {about.reasonsLabel && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f]">
              {about.reasonsLabel}
            </p>
          )}

          <h2 className="mt-2 font-serif text-3xl font-bold text-[#06364a] sm:text-4xl md:text-5xl">
            {about.reasonsHeading}
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            {about.reasonsDescription}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.reasons.map(
            (reason, index) => {
              const Icon =
                iconMap[
                  reason.icon as keyof typeof iconMap
                ] ?? Heart;

              return (
                <motion.div
                  key={`${reason.title}-${index}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 34,
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
                        : 1,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : index * 0.12,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -5,
                      }
                  }
                  className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#06364a]/10 text-[#06364a]">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 font-serif text-xl font-bold text-[#06364a]">
                    {reason.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {reason.description}
                  </p>
                </motion.div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutReasons;