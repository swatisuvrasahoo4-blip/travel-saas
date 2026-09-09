import {
  MessageCircle,
  Send,
} from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  Agency,
  getAgencyByDomain,
} from "@/services/agencyService";

const ExploreCta = () => {
  const [agency, setAgency] =
    useState<Agency | null>(null);

  useEffect(() => {
    const loadAgency = async () => {
      try {
        const hostname =
          window.location.hostname;

        const agencyData =
          await getAgencyByDomain(
            hostname
          );

        setAgency(agencyData);
      } catch (error) {
        console.error(
          "Unable to load CTA agency:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const whatsappNumber =
    agency.phone.replace(/\D/g, "");

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center text-white"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(3, 54, 74, 0.78),
            rgba(3, 54, 74, 0.78)
          ),
          url("${agency.heroImage || "/images/hero.png"}")
        `,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[1fr_1.6fr_auto] md:items-center lg:px-8">
        {/* Left Text */}
        <div className="text-center md:text-left">
          <p className="text-2xl font-semibold italic text-white sm:text-3xl">
            Let&apos;s Explore
          </p>

          <p className="text-2xl font-semibold italic text-white sm:text-3xl">
            Odisha Together
          </p>
        </div>

        {/* Center Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for Your Next Journey?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/90">
            Get in touch with us for the best travel packages,
            customized itineraries and exclusive offers.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/enquiry"
            className="flex min-w-48 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
            style={{
              backgroundColor:
                agency.accentColor,
            }}
          >
            <Send size={18} />
            Enquire Now
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-48 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-green-700"
          >
            <MessageCircle size={19} />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreCta;