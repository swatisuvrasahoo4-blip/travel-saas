import {
  motion,
  useReducedMotion,
} from "motion/react";

const ContactHero = () => {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <section
      className="relative flex min-h-[360px] items-center overflow-hidden bg-cover bg-center md:min-h-[430px]"
      style={{
        backgroundImage:
          "url('/images/destinations/destinations-hero.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/90 via-[#06364a]/55 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
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
          className="max-w-2xl text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4bc4ef] sm:text-sm">
            Get In Touch
          </p>

          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Contact Us
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/95 sm:text-base md:text-lg">
            Have a question or planning your next journey?
            Get in touch with us and our team will be
            happy to assist you.
          </p>

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration:
                shouldReduceMotion
                  ? 0
                  : 0.8,
              delay:
                shouldReduceMotion
                  ? 0
                  : 0.3,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              transformOrigin: "left",
            }}
            className="mt-5 h-1 w-20 rounded-full bg-[#ff681f]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;