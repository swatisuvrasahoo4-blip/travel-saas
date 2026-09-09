import {
  Mail,
  MapPin,
  Phone,
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

const Footer = () => {
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
          "Unable to load footer agency:",
          error
        );
      }
    };

    loadAgency();
  }, []);

  if (!agency) {
    return null;
  }

  const phoneHref =
    agency.phone.replace(
      /[^0-9+]/g,
      ""
    );

  const quickLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tour Packages",
      href: "/packages",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Cab Services",
      href: "/cabs",
    },
    {
      label: "Destinations",
      href: "/destinations",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  const currentYear =
    new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{
        backgroundColor:
          agency.primaryColor,
      }}
    >
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <section className="border-b border-white/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.05fr_1.1fr_1.1fr_0.8fr] lg:px-8">
          {/* =================================================
              BRAND
          ================================================== */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-block"
            >
              {agency.logo ? (
                <img
                  src={agency.logo}
                  alt={`${agency.name} logo`}
                  className="mx-auto max-h-20 max-w-56 object-contain md:mx-0"
                />
              ) : (
                <div>
                  <h3 className="text-3xl font-bold italic text-white">
                    {agency.name}
                  </h3>

                  <p className="mt-1 text-sm text-white/75">
                    {agency.tagline}
                  </p>
                </div>
              )}
            </Link>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}
          <div className="border-t border-white/15 pt-6 md:border-t-0 md:pt-0 lg:border-l lg:pl-8">
            <h3 className="mb-4 text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {quickLinks.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/85 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* =================================================
              CONTACT INFO
          ================================================== */}
          <div className="border-t border-white/15 pt-6 md:border-t-0 md:pt-0 lg:border-l lg:pl-8">
            <h3 className="mb-4 text-lg font-bold text-white">
              Contact Info
            </h3>

            <div className="space-y-4">
              {agency.address && (
                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="text-sm leading-6 text-white/85">
                    {agency.address}
                  </span>
                </div>
              )}

              {agency.phone && (
                <a
                  href={`tel:${phoneHref}`}
                  className="flex items-center gap-3 text-sm text-white/85 transition hover:text-white"
                >
                  <Phone
                    size={18}
                    className="shrink-0"
                  />

                  {agency.phone}
                </a>
              )}

              {agency.email && (
                <a
                  href={`mailto:${agency.email}`}
                  className="flex items-center gap-3 text-sm text-white/85 transition hover:text-white"
                >
                  <Mail
                    size={18}
                    className="shrink-0"
                  />

                  {agency.email}
                </a>
              )}
            </div>
          </div>

          {/* =================================================
              TAGLINE AREA
          ================================================== */}
          <div className="border-t border-white/15 pt-6 text-center md:text-left lg:border-t-0 lg:border-l lg:pl-8">
            <p className="text-xl leading-8 font-semibold italic text-white">
              Travel
              <br />
              Explore
              <br />
              Experience Odisha
            </p>

            <div
              className="mx-auto mt-4 h-1 w-20 rounded-full md:mx-0"
              style={{
                backgroundColor:
                  agency.accentColor,
              }}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}
      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-white/75 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
          <p>
            © {currentYear}{" "}
            {agency.name}. All Rights
            Reserved.
          </p>

          <p>
            Designed with{" "}
            <span className="text-red-500">
              ♥
            </span>{" "}
            for Odisha
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;