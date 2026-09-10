import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const AboutStory = () => {
  const shouldReduceMotion =
    useReducedMotion();

  const { agency } = useAgency();

  const story = agency?.about?.story;

  if (!story) {
    return null;
  }

  return (
    <section
      id="our-story"
      className="bg-[#fffaf3] py-14 md:py-20"
    >
      <div className="mx-auto grid max-w-[1700px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Image */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -45,
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
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src={story.image}
              alt={story.title}
              className="aspect-4/3 size-full object-cover"
            />
          </div>

          <motion.div
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
                  : 0.9,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.35,
            }}
            className="absolute -bottom-5 right-4 rounded-xl bg-white px-5 py-4 shadow-lg sm:right-6"
          >
            <p className="font-serif text-2xl font-bold text-[#ff681f]">
              {agency?.name}
            </p>

            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-[#06364a]">
              {agency?.tagline}
            </p>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 45,
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
          className="pt-4 lg:pt-0"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f]">
            {story.label}
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#06364a] md:text-4xl">
            {story.title}
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
                  : 0.2,
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

          <div className="mt-6 space-y-4">
            {story.paragraphs.map(
              (paragraph, index) => (
                <p
                  key={`${index}-${paragraph}`}
                  className="text-sm leading-7 text-gray-600 md:text-base"
                >
                  {paragraph}
                </p>
              )
            )}
          </div>

          <Link
            href="/contact"
            className="mt-7 inline-flex items-center rounded-lg bg-[#06364a] px-6 py-3 text-sm font-bold text-white transition duration-300 hover:bg-[#0a4962]"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStory;