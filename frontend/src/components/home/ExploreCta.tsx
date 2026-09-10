import {
  MessageCircle,
  Send,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

const ExploreCta = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    const loadAgency = async () => {
      try {
        const hostname =
          window.location.hostname;

        const agencyData =
          await getAgencyByDomain(
            hostname
          );

        setAgency(agencyData);
      } catch (error) {
        console.error(
          "Unable to load CTA agency:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const whatsappNumber =
    agency.phone.replace(/\D/g, "");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(3, 54, 74, 0.78),
            rgba(3, 54, 74, 0.78)
          ),
          url("${agency.heroImage || "/images/hero.png"}")
        `,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.6fr_auto] md:items-center lg:px-8">
        {/* Left Text */}
        <motion.div
          className="text-center md:text-left"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: -35,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
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
          <p className="text-2xl font-semibold italic text-white sm:text-3xl">
            Let&apos;s Explore
          </p>

          <p className="text-2xl font-semibold italic text-white sm:text-3xl">
            Odisha Together
          </p>
        </motion.div>

        {/* Center Text */}
        <motion.div
          className="text-center"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 25,
                }
          }
          whileInView={{
            opacity: 1,
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
                : 1.1,

            delay:
              shouldReduceMotion
                ? 0
                : 0.25,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for Your Next Journey?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/90">
            Get in touch with us for
            the best travel packages,
            customized itineraries and
            exclusive offers.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  x: 35,
                }
          }
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1.1,

            delay:
              shouldReduceMotion
                ? 0
                : 0.45,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          {/* Enquire Button */}
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                    scale: 1.035,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            transition={{
              duration: 0.2,
            }}
          >
            <Link
              href="/enquiry"
              className="flex min-w-48 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-xl"
              style={{
                backgroundColor:
                  agency.accentColor,
              }}
            >
              <Send size={18} />

              Enquire Now
            </Link>
          </motion.div>

          {/* WhatsApp Button */}
          <motion.div
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    y: -3,
                    scale: 1.035,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            transition={{
              duration: 0.2,
            }}
          >
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex min-w-48 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-xl"
            >
              <MessageCircle
                size={19}
              />

              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreCta;