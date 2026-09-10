import {
  Gem,
  Headphones,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const WhyChooseUs = () => {
  const { agency } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  const benefits = [
    {
      title: "Local Expertise",
      description:
        "Based in Odisha, we know it best",
      icon: Gem,
    },
    {
      title: "Personalized Trips",
      description:
        "Crafted as per your interests",
      icon: Users,
    },
    {
      title: "Trusted & Reliable",
      description:
        "Your safety is our priority",
      icon: ShieldCheck,
    },
    {
      title: "24/7 Support",
      description:
        "Always here for you",
      icon: Headphones,
    },
    {
      title: "Memorable Experiences",
      description:
        "More than trips, we create memories",
      icon: Heart,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#eef8fc] bg-cover bg-center py-12 md:py-14"
      style={{
        backgroundImage:
          "url('/images/why-choose-bg.png')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:max-w-[72%] xl:max-w-[70%]">

          {/* Heading */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -28,
                    y: 10,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.75,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <h2 className="text-center text-3xl font-bold text-[#06364a] sm:text-left md:text-4xl">
              Why Choose{" "}
              {agency?.name ||
                "Time Travels"}
              ?
            </h2>

            <motion.div
              className="mx-auto mt-2 h-1 w-16 rounded-full bg-[#ea580c] sm:mx-0"
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      scaleX: 0,
                      opacity: 0,
                    }
              }
              whileInView={{
                scaleX: 1,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.6,
                delay:
                  shouldReduceMotion
                    ? 0
                    : 0.15,
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
            />
          </motion.div>

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map(
              (
                {
                  title,
                  description,
                  icon: Icon,
                },
                index
              ) => (
                <motion.div
                  key={title}
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
                    amount: 0.3,
                  }}
                  transition={{
                    duration:
                      shouldReduceMotion
                        ? 0
                        : 0.7,

                    delay:
                      shouldReduceMotion
                        ? 0
                        : index *
                          0.13,

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
                  className="flex w-full flex-col items-center justify-start text-center"
                >
                  {/* Icon */}
                  <motion.div
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-[#06364a]"
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.12,
                            y: -2,
                          }
                    }
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                  >
                    <Icon
                      size={34}
                      strokeWidth={1.7}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mt-3 text-sm font-bold text-[#06364a]">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 max-w-40 text-xs leading-5 text-gray-600">
                    {description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;