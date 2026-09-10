import {
  useEffect,
  useState,
} from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CabHero from "@/components/cabs/CabHero";
import VehicleSection from "@/components/cabs/VehicleSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { useAgency } from "@/context/AgencyContext";

import {
  getVehicles,
} from "@/services/vehicleService";

import type { Vehicle } from "@/types/vehicle";

const CabsPage = () => {
    const { agency } = useAgency();
  const [
    vehicles,
    setVehicles,
  ] = useState<Vehicle[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const hostname =
          window.location.hostname;

        const data =
          await getVehicles(hostname);

        if (!cancelled) {
          setVehicles(data);
        }
      } catch (error) {
        console.error(
          "Unable to load vehicles:",
          error
        );

        if (!cancelled) {
          setError(
            "Unable to load vehicles."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadVehicles();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        {/* =========================================
            HERO
        ========================================== */}
        <CabHero agency={agency} />

        {/* =========================================
            VEHICLES
        ========================================== */}
        {!loading && error ? (
          <section className="bg-[#fffaf3] py-16">
            <div className="mx-auto max-w-[1700px] px-4 text-center sm:px-6 lg:px-8">
              <p className="text-sm text-red-500">
                {error}
              </p>
            </div>
          </section>
        ) : (
          <VehicleSection
            vehicles={vehicles}
            isLoading={loading}
          />
        )}

        {/* =========================================
            WHY CHOOSE US
        ========================================== */}
        <WhyChooseUs />
      </main>

      <Footer />
    </>
  );
};

export default CabsPage;