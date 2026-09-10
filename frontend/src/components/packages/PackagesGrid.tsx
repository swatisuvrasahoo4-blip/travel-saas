import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import TourPackageCard from "@/components/packages/TourPackageCard";

import {
  getPackages,
  type TourPackage,
} from "@/services/packageService";

const PackagesGrid = () => {
  const {
    agency,
    loading: agencyLoading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  const [
    packages,
    setPackages,
  ] = useState<TourPackage[]>([]);

  const [
    packagesLoading,
    setPackagesLoading,
  ] = useState(true);

  useEffect(() => {
    if (
      agencyLoading ||
      !agency
    ) {
      return;
    }

    let isCancelled = false;

    const loadPackages = async () => {
      try {
        setPackagesLoading(true);

        const hostname =
          window.location.hostname;

        const packageData =
          await getPackages(hostname);

        if (!isCancelled) {
          setPackages(packageData);
        }
      } catch (error) {
        console.error(
          "Unable to load tour packages:",
          error
        );

        if (!isCancelled) {
          setPackages([]);
        }
      } finally {
        if (!isCancelled) {
          setPackagesLoading(false);
        }
      }
    };

    loadPackages();

    return () => {
      isCancelled = true;
    };
  }, [
    agency,
    agencyLoading,
  ]);

  if (
    agencyLoading ||
    packagesLoading
  ) {
    return null;
  }

  if (
    !agency ||
    packages.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-[#fffaf3] py-16 md:py-20">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0
              : 1,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {packages.map(
            (
              tourPackage,
              index
            ) => (
              <TourPackageCard
                key={
                  tourPackage._id
                }
                tourPackage={
                  tourPackage
                }
                index={index}
                primaryColor={
                  agency.primaryColor
                }
                accentColor={
                  agency.accentColor
                }
              />
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PackagesGrid;