import ExploreCta from "@/components/home/ExploreCta";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Hero from "@/components/home/Hero";
import JourneyMoments from "@/components/home/JourneyMoments";
import TourPackages from "@/components/home/TourPackages";
import TravellerReviews from "@/components/home/TravellerReviews";
import TravelTypes from "@/components/home/TravelTypes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TravelTypes />
        <FeaturedDestinations />
        <TourPackages />
        <TravellerReviews />
        <WhyChooseUs />
        <JourneyMoments />
        <ExploreCta />
      </main>
      <Footer />
    </>
  );
}