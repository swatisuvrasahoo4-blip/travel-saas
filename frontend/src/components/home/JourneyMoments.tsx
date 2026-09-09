import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  GalleryItem,
  getFeaturedGallery,
} from "@/services/galleryService";

const JourneyMoments = () => {
  const [galleryItems, setGalleryItems] =
    useState<GalleryItem[]>([]);

  const [loading, setLoading] =
    useState(true);

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
          <div>
            <h2 className="text-2xl font-bold text-[#06364a] md:text-3xl">
              Moments from Our Journeys
            </h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-[#ea580c]" />
          </div>

          <Link
            href="/gallery"
            className="hidden whitespace-nowrap text-sm font-semibold text-[#06364a] transition hover:text-[#ea580c] sm:inline-block"
          >
            View Full Gallery →
          </Link>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map(
            (item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-xl"
              >
                <img
                  src={item.imageUrl}
                  alt={
                    item.caption ||
                    "Journey moment"
                  }
                  className="h-36 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-40 lg:h-36 xl:h-40"
                />
              </div>
            )
          )}
        </div>

        {/* Mobile Gallery Link */}
        <div className="mt-5 text-center sm:hidden">
          <Link
            href="/gallery"
            className="text-sm font-semibold text-[#06364a] transition hover:text-[#ea580c]"
          >
            View Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyMoments;