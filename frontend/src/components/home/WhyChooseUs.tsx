import {
  Gem,
  Headphones,
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useAgency } from "@/context/AgencyContext";

const WhyChooseUs = () => {
  const { agency } = useAgency();

  const benefits = [
    {
      title: "Local Expertise",
      description:
        "Based in Odisha, we know it best",
      icon: Gem,
    },
    {
      title: "Personalized Trips",
      description:
        "Crafted as per your interests",
      icon: Users,
    },
    {
      title: "Trusted & Reliable",
      description:
        "Your safety is our priority",
      icon: ShieldCheck,
    },
    {
      title: "24/7 Support",
      description:
        "Always here for you",
      icon: Headphones,
    },
    {
      title: "Memorable Experiences",
      description:
        "More than trips, we create memories",
      icon: Heart,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#eef8fc] bg-cover bg-center py-12 md:py-14"
      style={{
        backgroundImage:
          "url('/images/why-choose-bg.png')",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:max-w-[72%] xl:max-w-[70%]">
          {/* Heading */}
          <h2 className="text-center text-3xl font-bold text-[#06364a] sm:text-left md:text-4xl">
            Why Choose{" "}
            {agency?.name ||
              "Time Travels"}
            ?
          </h2>

          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-[#ea580c] sm:mx-0" />

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map(
              ({
                title,
                description,
                icon: Icon,
              }) => (
                <div
                  key={title}
                  className="flex w-full flex-col items-center justify-start text-center"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center text-[#06364a]">
                    <Icon
                      size={34}
                      strokeWidth={1.7}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 text-sm font-bold text-[#06364a]">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 max-w-40 text-xs leading-5 text-gray-600">
                    {description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;