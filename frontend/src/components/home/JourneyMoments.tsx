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
  GalleryItem,
  getFeaturedGallery,
} from "@/services/galleryService";

const JourneyMoments = () => {
  const [galleryItems, setGalleryItems] =
    useState<GalleryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const shouldReduceMotion =
    useReducedMotion();

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const hostname =
          window.location.hostname;

        const items =
          await getFeaturedGallery(
            hostname
          );

        setGalleryItems(items);
      } catch (error) {
        console.error(
          "Unable to load gallery:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return null;
  }

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between gap-4">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
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
                  : 0.7,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >
            <h2 className="text-2xl font-bold text-[#06364a] md:text-3xl">
              Moments from Our Journeys
            </h2>

            <motion.div
              className="mt-2 h-1 w-16 rounded-full bg-[#ea580c]"
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
                    : 0.55,

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

          {/* Desktop Gallery Link */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.65,

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
          >
            <Link
              href="/gallery"
              className="group hidden items-center whitespace-nowrap text-sm font-semibold text-[#06364a] transition-colors hover:text-[#ea580c] sm:inline-flex"
            >
              View Full Gallery

              <motion.span
                className="ml-1 inline-block"
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map(
            (item, index) => (
              <motion.div
                key={item._id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 26,
                        scale: 0.96,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 0.75,

                  delay:
                    shouldReduceMotion
                      ? 0
                      : index *
                        0.11,

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
                        scale: 1.015,
                      }
                }
                className="group overflow-hidden rounded-xl shadow-sm"
              >
                <motion.img
                  src={item.imageUrl}
                  alt={
                    item.caption ||
                    "Journey moment"
                  }
                  className="h-36 w-full object-cover sm:h-40 lg:h-36 xl:h-40"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.08,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )
          )}
        </div>

        {/* Mobile Gallery Link */}
        <motion.div
          className="mt-5 text-center sm:hidden"
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
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 0.55,

            delay:
              shouldReduceMotion
                ? 0
                : 0.25,
          }}
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#06364a] transition-colors hover:text-[#ea580c]"
          >
            View Full Gallery
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyMoments;