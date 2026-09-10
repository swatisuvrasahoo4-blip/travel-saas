import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const Footer = () => {
  const { agency, loading } =
    useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const primaryPhone =
    agency.phones?.[0] || "";

  const phoneHref =
    primaryPhone.replace(
      /[^0-9+]/g,
      ""
    );

  const quickLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tour Packages",
      href: "/packages",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Cab Services",
      href: "/cabs",
    },
    {
      label: "Destinations",
      href: "/destinations",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      className="overflow-hidden text-white"
      style={{
        backgroundColor:
          agency.primaryColor,
      }}
    >
      <section className="border-b border-white/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.05fr_1.1fr_1.1fr_0.8fr] lg:px-8">
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
          >
            <Link
              href="/"
              className="inline-block"
            >
              {agency.logo ? (
                <motion.img
                  src={agency.logo}
                  alt={`${agency.name} logo`}
                  className="mx-auto max-h-20 max-w-56 object-contain md:mx-0"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.03,
                        }
                  }
                  transition={{
                    duration: 0.25,
                  }}
                />
              ) : (
                <div>
                  <h3 className="text-3xl font-bold italic text-white">
                    {agency.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/75">
                    {agency.tagline}
                  </p>
                </div>
              )}
            </Link>
          </motion.div>

          <motion.div
            className="border-t border-white/15 pt-6 md:border-t-0 md:pt-0 lg:border-l lg:pl-8"
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
          >
            <h3 className="mb-4 text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {quickLinks.map(
                (item, index) => (
                  <motion.div
                    key={item.href}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 8,
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
                          : 0.6,
                      delay:
                        shouldReduceMotion
                          ? 0
                          : 0.35 +
                            index *
                              0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="inline-block text-sm text-white/85 transition-colors hover:text-white"
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                x: 4,
                              }
                        }
                        transition={{
                          duration:
                            0.2,
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            className="border-t border-white/15 pt-6 md:border-t-0 md:pt-0 lg:border-l lg:pl-8"
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
                  : 1.1,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.32,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <h3 className="mb-4 text-lg font-bold text-white">
              Contact Info
            </h3>

            <div className="space-y-4">
              {agency.address && (
                <motion.div
                  className="flex items-start gap-3"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="text-sm leading-6 text-white/85">
                    {agency.address}
                  </span>
                </motion.div>
              )}

              {agency.phones?.map(
                (phone) => {
                  const currentPhoneHref =
                    phone.replace(
                      /[^0-9+]/g,
                      ""
                    );

                  return (
                    <motion.a
                      key={phone}
                      href={`tel:${currentPhoneHref}`}
                      className="flex items-center gap-3 text-sm text-white/85 transition-colors hover:text-white"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: 3,
                            }
                      }
                      transition={{
                        duration:
                          0.2,
                      }}
                    >
                      <Phone
                        size={18}
                        className="shrink-0"
                      />

                      {phone}
                    </motion.a>
                  );
                }
              )}

              {agency.email && (
                <motion.a
                  href={`mailto:${agency.email}`}
                  className="flex items-center gap-3 text-sm text-white/85 transition-colors hover:text-white"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Mail
                    size={18}
                    className="shrink-0"
                  />

                  {agency.email}
                </motion.a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="border-t border-white/15 pt-6 text-center md:text-left lg:border-t-0 lg:border-l lg:pl-8"
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
              amount: 0.3,
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
            <p className="text-xl leading-8 font-semibold italic text-white">
              Travel
              <br />
              Explore
              <br />
              Experience Odisha
            </p>

            <motion.div
              className="mx-auto mt-4 h-1 w-20 rounded-full md:mx-0"
              style={{
                backgroundColor:
                  agency.accentColor,
                transformOrigin:
                  "left",
              }}
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
                    : 0.9,
                delay:
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
            />
          </motion.div>
        </div>
      </section>

      <section>
        <motion.div
          className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-white/75 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1,
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
          <p>
            © {currentYear}{" "}
            {agency.name}. All Rights
            Reserved.
          </p>

          <p>
            Designed with{" "}
            <span className="text-red-500">
              ♥
            </span>{" "}
            for Odisha
          </p>
        </motion.div>
      </section>
    </footer>
  );
};

export default Footer;