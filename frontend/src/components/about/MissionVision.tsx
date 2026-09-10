import {
  Eye,
  Target,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const MissionVision = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } = useAgency();

  const about = agency?.about;

  if (!about) {
    return null;
  }

  return (
    <section className="bg-[#fffaf3] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1700px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        {/* Left Content */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -40,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
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
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f]">
            {about.missionVisionLabel}
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#06364a] md:text-4xl">
            {about.missionVisionTitle}
          </h2>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
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
                  : 0.18,
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
            className="mt-4 h-1 w-16 rounded-full bg-[#ff681f]"
          />

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 md:text-base">
            {about.missionVisionDescription}
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mission */}
          <motion.article
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
            className="rounded-2xl bg-[#edf7f0] p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-white text-[#06364a] shadow-sm">
              <Target
                size={25}
                strokeWidth={1.8}
              />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#06364a]">
              {about.mission.heading}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              {about.mission.description}
            </p>
          </motion.article>

          {/* Vision */}
          <motion.article
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
                  : 0.12,
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
            className="rounded-2xl bg-[#fff2e8] p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-white text-[#06364a] shadow-sm">
              <Eye
                size={25}
                strokeWidth={1.8}
              />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#06364a]">
              {about.vision.heading}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              {about.vision.description}
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;