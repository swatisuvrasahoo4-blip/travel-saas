import {
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

import {
  FormEvent,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useAgency,
} from "@/context/AgencyContext";

import {
  sendContactMessage,
} from "@/services/contactService";

import ContactLocation from "./ContactLocation";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const { agency } = useAgency();

  const shouldReduceMotion =
    useReducedMotion();

  const [
    formData,
    setFormData,
  ] = useState<ContactFormData>(
    initialFormData
  );

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const handleChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (successMessage) {
      setSuccessMessage("");
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.phone.trim()) {
      setErrorMessage(
        "Phone number is required."
      );
      return;
    }

    if (
      typeof window === "undefined"
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      const response =
        await sendContactMessage({
          hostname:
            window.location.hostname,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        });

      if (response.success) {
        setSuccessMessage(
          response.message ||
            "Your message has been sent successfully."
        );

        setFormData(
          initialFormData
        );
      }
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      setErrorMessage(
        "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8">
        <motion.div
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
            amount: 0.15,
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
        >
          {/* Heading */}

          <div className="text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em] sm:text-sm"
              style={{
                color:
                  agency?.accentColor ||
                  "#ff681f",
              }}
            >
              Send A Message
            </p>

            <h2
              className="mt-2 font-serif text-3xl font-bold md:text-4xl"
              style={{
                color:
                  agency?.primaryColor ||
                  "#06364a",
              }}
            >
              We&apos;d Love to Hear
              From You
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
              Tell us about your travel
              plans or questions and our
              team will get back to you.
            </p>

            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{
                backgroundColor:
                  agency?.accentColor ||
                  "#ff681f",
              }}
            />
          </div>

          {/* Form + Map */}

          <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-2">
            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="h-full rounded-3xl border border-gray-100 bg-[#fffaf3] p-5 shadow-sm sm:p-7 md:p-9"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {/* Name */}

                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="contact-name"
                      type="text"
                      value={
                        formData.name
                      }
                      onChange={(event) =>
                        handleChange(
                          "name",
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-11 text-sm text-gray-800 outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number

                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={
                        formData.phone
                      }
                      onChange={(event) =>
                        handleChange(
                          "phone",
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-11 text-sm text-gray-800 outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
                    />
                  </div>
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="contact-email"
                      type="email"
                      value={
                        formData.email
                      }
                      onChange={(event) =>
                        handleChange(
                          "email",
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-11 text-sm text-gray-800 outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
                    />
                  </div>
                </div>

                {/* Subject */}

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Subject
                  </label>

                  <div className="relative">
                    <MessageSquare
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="contact-subject"
                      type="text"
                      value={
                        formData.subject
                      }
                      onChange={(event) =>
                        handleChange(
                          "subject",
                          event.target
                            .value
                        )
                      }
                      placeholder="Enter subject"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-4 pl-11 text-sm text-gray-800 outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  rows={6}
                  value={
                    formData.message
                  }
                  onChange={(event) =>
                    handleChange(
                      "message",
                      event.target.value
                    )
                  }
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm leading-6 text-gray-800 outline-none transition focus:border-[#4bc4ef] focus:ring-2 focus:ring-[#4bc4ef]/20"
                />
              </div>

              {/* Success */}

              {successMessage && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {successMessage}
                </div>
              )}

              {/* Error */}

              {errorMessage && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Submit */}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.02,
                      }
                }
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 0.97,
                      }
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md transition disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{
                  backgroundColor:
                    agency?.accentColor ||
                    "#ff681f",
                }}
              >
                <Send size={18} />

                {isSubmitting
                  ? "Sending..."
                  : "Send Message"}
              </motion.button>
            </form>

            {/* Pinned Office Map */}

            <ContactLocation />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;