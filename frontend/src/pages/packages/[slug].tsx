import Link from "next/link";
import { useRouter } from "next/router";

import {
  useEffect,
  useState,
} from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import PackageAbout from "@/components/packages/detail/PackageAbout";
import PackageCustomizeCta from "@/components/packages/detail/PackageCustomizeCta";
import PackageDetailHero from "@/components/packages/detail/PackageDetailHero";
import PackageItinerary from "@/components/packages/detail/PackageItinerary";
import PackageQuickInfo from "@/components/packages/detail/PackageQuickInfo";
import PackageReferenceInfo from "@/components/packages/detail/PackageReferenceInfo";
import PackageVehicleOptions from "@/components/packages/detail/PackageVehicleOptions";

import { useAgency } from "@/context/AgencyContext";

import {
  getPackageBySlug,
  type TourPackage,
} from "@/services/packageService";

const PackageDetailPage = () => {
  const router = useRouter();

  const { slug } = router.query;

  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const [
    tourPackage,
    setTourPackage,
  ] = useState<TourPackage | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof slug !== "string") {
      return;
    }

    let cancelled = false;

    const loadPackage = async () => {
      try {
        setLoading(true);
        setError("");

        const hostname =
          window.location.hostname;

        const data =
          await getPackageBySlug(
            hostname,
            slug
          );

        if (!cancelled) {
          setTourPackage(data);
        }
      } catch (error) {
        console.error(
          "Unable to load package:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load this tour package."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPackage();

    return () => {
      cancelled = true;
    };
  }, [router.isReady, slug]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading || agencyLoading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-white" />

        <Footer />
      </>
    );
  }

  /* =========================================
     ERROR / NOT FOUND
  ========================================= */

  if (
    error ||
    !tourPackage ||
    !agency
  ) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <h1
              className="text-3xl font-bold"
              style={{
                color:
                  agency?.primaryColor ||
                  "#06364a",
              }}
            >
              Tour Package Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              {error ||
                "This tour package is not available."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90"
              style={{
                backgroundColor:
                  agency?.accentColor ||
                  "#ea580c",
              }}
            >
              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  /* =========================================
     PACKAGE DETAIL PAGE
  ========================================= */

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        <PackageDetailHero
          tourPackage={tourPackage}
        />

        <PackageQuickInfo
          tourPackage={tourPackage}
        />

        <PackageAbout
          tourPackage={tourPackage}
        />

        {/* =====================================
            ITINERARY + REFERENCE INFORMATION
        ===================================== */}

        <section className="pt-8 pb-3 md:pt-10 md:pb-4">
          <div className="mx-auto grid max-w-[1700px] items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[1.28fr_1fr] lg:px-8">
            <PackageItinerary
              tourPackage={tourPackage}
            />

            <div className="flex h-full flex-col">
  <PackageReferenceInfo
    tourPackage={tourPackage}
  />

  <div className="mt-auto pt-4">
    <PackageVehicleOptions
      tourPackage={tourPackage}
    />
  </div>
</div>
          </div>
        </section>

        {/* <PackageCustomizeCta
          tourPackage={tourPackage}
        /> */}
      </main>

      <Footer />
    </>
  );
};

export default PackageDetailPage;