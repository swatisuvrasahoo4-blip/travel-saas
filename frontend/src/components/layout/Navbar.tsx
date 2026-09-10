import {
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useRouter,
} from "next/router";

import {
  useState,
} from "react";

import {
  useAgency,
} from "@/context/AgencyContext";

const Navbar = () => {
  const router = useRouter();

  const {
    agency,
    loading,
  } = useAgency();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  if (loading) {
    return (
      <>
        <header className="relative z-50 w-full bg-white md:fixed md:inset-x-0 md:top-0">
          <div className="min-h-18" />
        </header>

        <div className="hidden h-28 md:block" />
      </>
    );
  }

  if (!agency) {
    return (
      <>
        <header className="relative z-50 w-full bg-white md:fixed md:inset-x-0 md:top-0">
          <div className="flex min-h-20 items-center justify-center">
            <p className="text-sm text-gray-500">
              Agency not found
            </p>
          </div>
        </header>

        <div className="hidden h-20 md:block" />
      </>
    );
  }

  const navigation = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Destinations",
      href: "/destinations",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Tour Packages",
      href: "/packages",
    },
    {
      label: "Cab Services",
      href: "/cabs",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Contact Us",
      href: "/contact",
    },
  ];

  const isActiveRoute = (
    href: string
  ) => {
    const pathname =
      router.pathname;

    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };

  const nameParts =
    agency.name
      .trim()
      .split(/\s+/);

  const lastWord =
    nameParts.length > 1
      ? nameParts[
          nameParts.length - 1
        ]
      : "";

  const firstPart =
    nameParts.length > 1
      ? nameParts
          .slice(0, -1)
          .join(" ")
      : agency.name;

  const phoneHref =
    agency.phone.replace(
      /[^0-9+]/g,
      ""
    );

  return (
    <>
      <header className="relative z-50 w-full bg-white md:fixed md:inset-x-0 md:top-0">
        {/* Mobile top bar */}
        {agency.phone && (
          <div
            className="md:hidden"
            style={{
              backgroundColor:
                agency.primaryColor,
            }}
          >
            <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-start px-4 sm:px-6">
              <a
                href={`tel:${phoneHref}`}
                className="flex items-center gap-2 text-xs font-semibold text-white transition hover:opacity-80"
              >
                <Phone
                  size={13}
                />

                <span>
                  {agency.phone}
                </span>
              </a>
            </div>
          </div>
        )}

        {/* Desktop top information bar */}
        <div
          className="hidden md:block"
          style={{
            backgroundColor:
              agency.primaryColor,
          }}
        >
          <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
            {agency.address && (
              <div className="flex min-w-0 items-center gap-2 text-xs text-white">
                <MapPin
                  size={14}
                  className="shrink-0"
                />

                <span className="truncate">
                  {agency.address}
                </span>
              </div>
            )}

            <div className="flex shrink-0 items-center gap-6">
              {agency.phone && (
                <a
                  href={`tel:${phoneHref}`}
                  className="flex items-center gap-2 text-xs font-medium text-white transition hover:opacity-80"
                >
                  <Phone
                    size={14}
                  />

                  <span>
                    {agency.phone}
                  </span>
                </a>
              )}

              {agency.email && (
                <a
                  href={`mailto:${agency.email}`}
                  className="flex items-center gap-2 text-xs font-medium text-white transition hover:opacity-80"
                >
                  <Mail
                    size={14}
                  />

                  <span>
                    {agency.email}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="border-b border-gray-100 bg-white shadow-sm">
          <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Agency brand */}
            <Link
              href="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="flex min-w-0 items-center gap-3"
            >
              {agency.logo && (
                <img
                  src={agency.logo}
                  alt={`${agency.name} logo`}
                  className="size-11 shrink-0 object-contain"
                />
              )}

              <div className="min-w-0">
                <div className="flex items-baseline gap-1 text-xl font-black tracking-tight sm:text-2xl">
                  <span
                    className="truncate"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    {firstPart}
                  </span>

                  {lastWord && (
                    <span
                      className="shrink-0"
                      style={{
                        color:
                          agency.accentColor,
                      }}
                    >
                      {lastWord}
                    </span>
                  )}
                </div>

                {agency.tagline && (
                  <p
                    className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.12em] sm:block"
                    style={{
                      color:
                        agency.primaryColor,
                    }}
                  >
                    {agency.tagline}
                  </p>
                )}
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navigation.map(
                (item) => {
                  const isActive =
                    isActiveRoute(
                      item.href
                    );

                  return (
                    <Link
                      key={item.href}
                      href={
                        item.href
                      }
                      className="relative px-3 py-2 text-sm font-semibold text-gray-700 transition"
                      style={{
                        color:
                          isActive
                            ? agency
                                .accentColor
                            : undefined,
                      }}
                      onMouseEnter={(
                        event
                      ) => {
                        event.currentTarget.style.color =
                          agency.accentColor;
                      }}
                      onMouseLeave={(
                        event
                      ) => {
                        event.currentTarget.style.color =
                          isActive
                            ? agency
                                .accentColor
                            : "";
                      }}
                    >
                      {
                        item.label
                      }

                      {isActive && (
                        <span
                          className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full"
                          style={{
                            backgroundColor:
                              agency.accentColor,
                          }}
                        />
                      )}
                    </Link>
                  );
                }
              )}

              <Link
                href="/enquiry"
                className="ml-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                style={{
                  backgroundColor:
                    agency.accentColor,
                }}
              >
                Enquire Now
              </Link>
            </nav>

            {/* Mobile / tablet menu button */}
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (
                    previous
                  ) =>
                    !previous
                )
              }
              className="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 lg:hidden"
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={
                menuOpen
              }
            >
              {menuOpen ? (
                <X
                  size={22}
                />
              ) : (
                <Menu
                  size={22}
                />
              )}
            </button>
          </div>

          {/* Mobile / tablet navigation */}
          {menuOpen && (
            <div className="border-t border-gray-100 bg-white lg:hidden">
              <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-1">
                  {navigation.map(
                    (item) => {
                      const isActive =
                        isActiveRoute(
                          item.href
                        );

                      return (
                        <Link
                          key={
                            item.href
                          }
                          href={
                            item.href
                          }
                          onClick={() =>
                            setMenuOpen(
                              false
                            )
                          }
                          className="relative rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                          style={{
                            color:
                              isActive
                                ? agency
                                    .accentColor
                                : undefined,
                          }}
                        >
                          {
                            item.label
                          }

                          {isActive && (
                            <span
                              className="absolute bottom-1 left-4 h-0.5 w-8 rounded-full"
                              style={{
                                backgroundColor:
                                  agency.accentColor,
                              }}
                            />
                          )}
                        </Link>
                      );
                    }
                  )}

                  <Link
                    href="/enquiry"
                    onClick={() =>
                      setMenuOpen(
                        false
                      )
                    }
                    className="mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white"
                    style={{
                      backgroundColor:
                        agency.accentColor,
                    }}
                  >
                    Enquire Now
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Prevent desktop content from going underneath fixed navbar */}
      <div className="hidden h-28 md:block" />
    </>
  );
};

export default Navbar;