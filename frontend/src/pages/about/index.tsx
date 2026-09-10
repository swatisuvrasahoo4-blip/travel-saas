import AboutCta from "@/components/about/AboutCta";
import AboutHero from "@/components/about/AboutHero";
import AboutReasons from "@/components/about/AboutReasons";
import AboutStats from "@/components/about/AboutStats";
import AboutStory from "@/components/about/AboutStory";
import MissionVision from "@/components/about/MissionVision";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white">
        <AboutHero />
        <AboutStory />
        <AboutReasons />
        <AboutStats />
        <MissionVision />
        <AboutCta />
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;