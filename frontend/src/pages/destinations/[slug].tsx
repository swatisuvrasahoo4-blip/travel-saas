import {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import DestinationAttractions from "@/components/destinations/DestinationAttractions";
import DestinationCta from "@/components/destinations/DestinationCta";
import DestinationHero from "@/components/destinations/DestinationHero";
import DestinationOverview from "@/components/destinations/DestinationOverview";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import {
  Destination,
  getDestinationBySlug,
} from "@/services/destinationService";

const DestinationPage = () => {
  const router = useRouter();

  const [destination, setDestination] =
    useState<Destination | null>(null);

  const [error, setError] =
    useState("");

  const slug = router.query.slug;

  useEffect(() => {
    if (
      !router.isReady ||
      typeof slug !== "string"
    ) {
      return;
    }

    let isCancelled = false;

    const loadDestination =
      async () => {
        try {
          setError("");

          const hostname =
            window.location.hostname;

          const destinationData =
            await getDestinationBySlug(
              hostname,
              slug
            );

          if (!isCancelled) {
            setDestination(
              destinationData
            );
          }
        } catch (error) {
          console.error(
            "Unable to load destination:",
            error
          );

          if (!isCancelled) {
            setError(
              "Destination not found."
            );
          }
        }
      };

    loadDestination();

    return () => {
      isCancelled = true;
    };
  }, [
    router.isReady,
    slug,
  ]);

  if (error) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-96 items-center justify-center bg-white px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#06364a]">
              Destination Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The destination you are
              looking for is not
              available.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main>
        {destination ? (
          <>
            <DestinationHero
              destination={
                destination
              }
            />

            <DestinationOverview
              destination={
                destination
              }
            />

            <DestinationAttractions
              destination={
                destination
              }
            />

            <DestinationCta
              destination={
                destination
              }
            />
          </>
        ) : (
          <div className="min-h-screen bg-white" />
        )}
      </main>

      {destination && <Footer />}
    </>
  );
};

export default DestinationPage;