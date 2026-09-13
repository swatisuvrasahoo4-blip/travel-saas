import {
  useCallback,
  useState,
} from "react";

import CustomTourCta from "@/components/packages/CustomTourCta";
import PackagesGrid from "@/components/packages/PackagesGrid";
import PackagesHero from "@/components/packages/PackagesHero";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const PackagesPage = () => {
  const [
    packagesLoading,
    setPackagesLoading,
  ] = useState(true);

  const handlePackagesLoadingChange =
    useCallback(
      (isLoading: boolean) => {
        setPackagesLoading(
          isLoading
        );
      },
      []
    );

  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3]">
        <PackagesHero />

        <PackagesGrid
          onLoadingChange={
            handlePackagesLoadingChange
          }
        />

        {!packagesLoading && (
          <CustomTourCta />
        )}
      </main>

      {!packagesLoading && (
        <Footer />
      )}
    </>
  );
};

export default PackagesPage;