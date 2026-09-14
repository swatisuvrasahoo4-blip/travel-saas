import Head from "next/head";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Image as ImageIcon,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  GalleryItem,
  getGallery,
} from "@/services/galleryService";

type GalleryFilter =
  | "all"
  | GalleryItem["category"];

const GalleryPage = () => {
  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  const [
    galleryItems,
    setGalleryItems,
  ] = useState<GalleryItem[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    filter,
    setFilter,
  ] = useState<GalleryFilter>(
    "all"
  );

  useEffect(() => {
    if (
      agencyLoading ||
      !agency
    ) {
      return;
    }

    let isCancelled = false;

    const loadGallery =
      async () => {
        try {
          setIsLoading(true);
          setError("");

          const hostname =
            window.location.hostname;

          const items =
            await getGallery(
              hostname
            );

          if (!isCancelled) {
            setGalleryItems(
              items
            );
          }
        } catch (loadError) {
          console.error(
            "Unable to load gallery:",
            loadError
          );

          if (!isCancelled) {
            setError(
              "Unable to load gallery."
            );
          }
        } finally {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      };

    void loadGallery();

    return () => {
      isCancelled = true;
    };
  }, [
    agency,
    agencyLoading,
  ]);

  const filteredItems =
    useMemo(() => {
      if (filter === "all") {
        return galleryItems;
      }

      return galleryItems.filter(
        (item) =>
          item.category ===
          filter
      );
    }, [
      galleryItems,
      filter,
    ]);

  const filters: {
    label: string;
    value: GalleryFilter;
  }[] = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Customer Trips",
      value: "customer-trip",
    },
    {
      label: "Tour Moments",
      value: "tour-moment",
    },
    {
      label: "Vehicles",
      value: "vehicle",
    },
    {
      label: "Group Tours",
      value: "group-tour",
    },
    {
      label: "Special Moments",
      value: "special-moment",
    },
  ];

  if (
    agencyLoading ||
    !agency
  ) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Gallery | {agency.name}
        </title>

        <meta
          name="description"
          content={`Explore travel moments and journeys from ${agency.name}.`}
        />
      </Head>

      <Navbar />

      <main>
        {/* Hero */}

        <section className="bg-[#eef8fc] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-[1700px] text-center">
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  shouldReduceMotion
                    ? 0
                    : 0.65,
              }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em]"
                style={{
                  color:
                    agency.accentColor,
                }}
              >
                Travel Memories
              </p>

              <h1
                className="mt-3 font-serif text-4xl font-bold sm:text-5xl"
                style={{
                  color:
                    agency.primaryColor,
                }}
              >
                Our Gallery
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Explore memorable
                journeys, tour moments,
                vehicles and experiences
                from {agency.name}.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery */}

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
            {/* Filters */}

            {galleryItems.length >
              0 && (
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {filters.map(
                  (
                    item
                  ) => (
                    <button
                      key={
                        item.value
                      }
                      type="button"
                      onClick={() =>
                        setFilter(
                          item.value
                        )
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        filter ===
                        item.value
                          ? "text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                      style={
                        filter ===
                        item.value
                          ? {
                              backgroundColor:
                                agency.primaryColor,
                            }
                          : undefined
                      }
                    >
                      {
                        item.label
                      }
                    </button>
                  )
                )}
              </div>
            )}

            {/* Loading */}

            {isLoading ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200"
                    style={{
                      borderTopColor:
                        agency.primaryColor,
                    }}
                  />

                  <p className="text-sm text-slate-500">
                    Loading gallery...
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-5 text-center text-sm text-red-600">
                {error}
              </div>
            ) : galleryItems.length ===
              0 ? (
              <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
                <div>
                  <ImageIcon
                    size={38}
                    className="mx-auto text-slate-300"
                  />

                  <h2
                    className="mt-4 font-serif text-2xl font-semibold"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    No gallery images yet
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Travel moments will
                    appear here when
                    they are added.
                  </p>
                </div>
              </div>
            ) : filteredItems.length ===
              0 ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60">
                <p className="text-sm text-slate-500">
                  No images found in
                  this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map(
                  (
                    item,
                    index
                  ) => (
                    <motion.article
                      key={
                        item._id
                      }
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity:
                                0,
                              y: 22,
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
                            : 0.55,
                        delay:
                          shouldReduceMotion
                            ? 0
                            : Math.min(
                                index *
                                  0.06,
                                0.3
                              ),
                      }}
                      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                    >
                      <div className="overflow-hidden">
                        <motion.img
                          src={
                            item.imageUrl
                          }
                          alt={
                            item.caption ||
                            "Travel gallery image"
                          }
                          className="h-64 w-full object-cover"
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  scale:
                                    1.06,
                                }
                          }
                          transition={{
                            duration:
                              0.45,
                          }}
                        />
                      </div>

                      {item.caption && (
                        <div className="p-4">
                          <p className="text-sm leading-6 text-slate-600">
                            {
                              item.caption
                            }
                          </p>
                        </div>
                      )}
                    </motion.article>
                  )
                )}
              </div>
            )}

            {galleryItems.length >
              0 && (
              <div className="mt-10 text-center">
                <Link
                  href="/"
                  className="inline-flex rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
                  style={{
                    borderColor:
                      `${agency.primaryColor}30`,
                    color:
                      agency.primaryColor,
                  }}
                >
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GalleryPage;