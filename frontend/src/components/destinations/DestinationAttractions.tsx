import type {
  Destination,
} from "@/services/destinationService";

interface DestinationAttractionsProps {
  destination: Destination;
}

const DestinationAttractions = ({
  destination,
}: DestinationAttractionsProps) => {
  if (
    !destination.attractions ||
    destination.attractions.length === 0
  ) {
    return null;
  }

  return (
    <section className="w-full bg-[#fffaf3] py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#06364a] sm:text-3xl">
            Places to Explore in{" "}
            {destination.name}
          </h2>

          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-600" />
        </div>

        {/* Attraction Cards */}
        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destination.attractions.map(
            (attraction, index) => (
              <article
                key={`${attraction.title}-${index}`}
                className="group overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="aspect-4/3 w-full overflow-hidden bg-gray-100">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="size-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#06364a]">
                    {attraction.title}
                  </h3>

                  {attraction.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {attraction.description}
                    </p>
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationAttractions;