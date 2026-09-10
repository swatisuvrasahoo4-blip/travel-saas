import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#fffaf3]">
        <ContactHero />

        <ContactInfo />

        <ContactForm />

      </main>

      <Footer />
    </>
  );
}