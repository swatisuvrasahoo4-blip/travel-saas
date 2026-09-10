import {
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import { useAgency } from "@/context/AgencyContext";

const ContactInfo = () => {
  const { agency } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  if (!agency) {
    return null;
  }

  const cleanPhone = (
    phone: string
  ) => {
    return phone.replace(
      /[^\d+]/g,
      ""
    );
  };

  const cards = [
    {
      id: "phone",
      icon: Phone,
      title: "Call Us",
      content:
        agency.phones?.length ? (
          <div className="flex flex-col items-center gap-1">
            {agency.phones.map(
              (phone) => (
                <a
                  key={phone}
                  href={`tel:${cleanPhone(
                    phone
                  )}`}
                  className="transition-colors duration-200 hover:text-[#ff681f]"
                >
                  {phone}
                </a>
              )
            )}
          </div>
        ) : (
          <span>
            Not available
          </span>
        ),
    },

    {
      id: "email",
      icon: Mail,
      title: "Email Us",
      content: agency.email ? (
        <a
          href={`mailto:${agency.email}`}
          className="break-all transition-colors duration-200 hover:text-[#ff681f]"
        >
          {agency.email}
        </a>
      ) : (
        <span>
          Not available
        </span>
      ),
    },

    {
      id: "address",
      icon: MapPin,
      title: "Visit Us",
      content: agency.address ? (
        <span>
          {agency.address}
        </span>
      ) : (
        <span>
          Not available
        </span>
      ),
    },

    {
      id: "hours",
      icon: Clock,
      title: "Business Hours",
      content: (
        <span>
          Contact us for availability
        </span>
      ),
    },
  ];

  return (
    <section className="bg-[#fffaf3] py-12 md:py-16">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 1,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff681f] sm:text-sm">
            Contact Information
          </p>

          <h2 className="mt-2 font-serif text-3xl font-bold text-[#06364a] md:text-4xl">
            We&apos;re Here to Help
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
            Reach out to us for
            travel enquiries,
            bookings or assistance
            with your journey.
          </p>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.8,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.2,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin:
                "center",
            }}
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ff681f]"
          />
        </motion.div>

        {/* Contact Cards */}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(
            (
              {
                id,
                icon: Icon,
                title,
                content,
              },
              index
            ) => (
              <motion.div
                key={id}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration:
                    shouldReduceMotion
                      ? 0
                      : 0.8,
                  delay:
                    shouldReduceMotion
                      ? 0
                      : index *
                        0.1,
                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
                className="rounded-2xl border border-gray-100 bg-white px-5 py-7 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef8fc]">
                  <Icon
                    size={25}
                    strokeWidth={1.8}
                    className="text-[#06364a]"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#06364a]">
                  {title}
                </h3>

                <div className="mt-2 text-sm leading-6 text-gray-600">
                  {content}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;