import CustomTourCta from "@/components/packages/CustomTourCta";
import PackagesGrid from "@/components/packages/PackagesGrid";
import PackagesHero from "@/components/packages/PackagesHero";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const PackagesPage = () => {
  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3]">
        <PackagesHero />

        <PackagesGrid />

        <CustomTourCta />
      </main>

      <Footer />
    </>
  );
};

export default PackagesPage;