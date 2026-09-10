import {
  motion,
  useReducedMotion,
} from "motion/react";

import VehicleCard from "@/components/cabs/VehicleCard";

import type { Vehicle } from "@/types/vehicle";

interface VehicleSectionProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

const VehicleSection = ({
  vehicles,
  isLoading,
}: VehicleSectionProps) => {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section className="bg-[#fffaf3] py-12 md:py-16">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* =========================================
            SECTION HEADING
        ========================================== */}
        <motion.div
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
            amount: 0.35,
          }}
          transition={{
            duration: shouldReduceMotion
              ? 0
              : 1.1,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f]">
            Our Fleet
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold text-[#06364a] md:text-4xl">
            Choose Your Vehicle
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
            Choose from comfortable and
            reliable vehicles for family trips,
            group tours and long journeys.
          </p>

          {/* Accent Line */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : 0.9,
              delay: shouldReduceMotion
                ? 0
                : 0.18,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin: "center",
            }}
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ff681f]"
          />
        </motion.div>

        {/* =========================================
            LOADING
        ========================================== */}
        {isLoading && (
          <div className="min-h-[300px]" />
        )}

        {/* =========================================
            EMPTY STATE
        ========================================== */}
        {!isLoading &&
          vehicles.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-gray-500">
                No vehicles are available yet.
              </p>
            </div>
          )}

        {/* =========================================
            VEHICLES
        ========================================== */}
        {!isLoading &&
          vehicles.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.map(
                (vehicle, index) => (
                  <motion.div
                    key={vehicle._id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 32,
                            scale: 0.98,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration:
                        shouldReduceMotion
                          ? 0
                          : 0.9,
                      delay:
                        shouldReduceMotion
                          ? 0
                          : index * 0.1,
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
                            y: -6,
                          }
                    }
                  >
                    <VehicleCard
                      vehicle={vehicle}
                    />
                  </motion.div>
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default VehicleSection;