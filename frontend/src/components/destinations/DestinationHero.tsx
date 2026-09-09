import type {
  Destination,
} from "@/services/destinationService";

interface DestinationHeroProps {
  destination: Destination;
}

const DestinationHero = ({
  destination,
}: DestinationHeroProps) => {
  return (
    <section
      className="relative flex min-h-96 w-full items-center overflow-hidden bg-cover bg-center md:min-h-120"
      style={{
        backgroundImage: `url("${destination.heroImage}")`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {destination.name}
          </h1>

          {destination.subtitle && (
            <p className="mt-4 text-lg font-medium text-white/95 sm:text-xl md:text-2xl">
              {destination.subtitle}
            </p>
          )}

          <div className="mt-5 h-1 w-20 rounded-full bg-orange-500" />
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;