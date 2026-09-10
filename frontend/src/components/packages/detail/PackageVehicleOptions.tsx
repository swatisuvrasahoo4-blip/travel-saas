import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

import type {
  TourPackage,
} from "@/services/packageService";

interface PackageVehicleOptionsProps {
  tourPackage: TourPackage;
}

const PackageVehicleOptions = ({
  tourPackage,
}: PackageVehicleOptionsProps) => {
  const {
    agency,
    loading,
  } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (loading || !agency) {
    return null;
  }

  const vehicleImage =
    agency.packageDetail
      ?.vehicleOptionsImage;

  if (!vehicleImage) {
    return null;
  }

  return (
    <motion.div
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
        amount: 0.2,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0
            : 1,
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
              y: -4,
            }
      }
      className="overflow-hidden rounded-lg"
    >
      <motion.img
        src={vehicleImage}
        alt="Available vehicle options"
        className="block h-auto w-full object-contain"
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                scale: 1.01,
              }
        }
        transition={{
          duration: 0.3,
        }}
      />
    </motion.div>
  );
};

export default PackageVehicleOptions;