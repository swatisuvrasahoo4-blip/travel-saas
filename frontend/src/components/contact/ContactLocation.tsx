import {
  ExternalLink,
  MapPin,
} from "lucide-react";

import {
  useAgency,
} from "@/context/AgencyContext";

const ContactLocation = () => {
  const { agency } = useAgency();

  if (!agency?.address) {
    return null;
  }

  const mapQuery =
    encodeURIComponent(
      `${agency.name}, ${agency.address}`
    );

  /*
   * Google Maps place view.
   * Including the agency name + full address
   * gives Google a better chance of resolving
   * the exact office location and showing its pin.
   */
  const mapEmbedUrl =
    `https://www.google.com/maps?` +
    `q=${mapQuery}` +
    `&z=17` +
    `&output=embed`;

  const mapOpenUrl =
    `https://www.google.com/maps/search/` +
    `?api=1&query=${mapQuery}`;

  return (
    <div className="h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Map */}

      <div className="relative h-[380px] overflow-hidden md:h-[460px] lg:h-[520px]">
        <iframe
          title={`${agency.name} office location`}
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>

      {/* Office Address */}

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                `${
                  agency.accentColor ||
                  "#ff681f"
                }18`,
            }}
          >
            <MapPin
              size={23}
              style={{
                color:
                  agency.accentColor ||
                  "#ff681f",
              }}
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Office Location
            </p>

            <h3
              className="mt-1 text-lg font-bold"
              style={{
                color:
                  agency.primaryColor ||
                  "#06364a",
              }}
            >
              {agency.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {agency.address}
            </p>

            <a
              href={mapOpenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold transition-opacity hover:opacity-70"
              style={{
                color:
                  agency.accentColor ||
                  "#ff681f",
              }}
            >
              <MapPin size={16} />
              Get Directions
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;