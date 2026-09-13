import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Plane,
  ShieldCheck,
} from "lucide-react";

import Head from "next/head";
import Image from "next/image";

import {
  useRouter,
} from "next/router";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useAdminAuth,
} from "@/context/AdminAuthContext";

const AdminLoginPage = () => {
  const router = useRouter();

  const {
    login,
    isAuthenticated,
    isLoading,
    agency,
  } = useAdminAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      isAuthenticated
    ) {
      void router.replace(
        "/admin/dashboard"
      );
    }
  }, [
    isLoading,
    isAuthenticated,
    router,
  ]);

  const handleSubmit =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      setError("");

      if (
        !email.trim() ||
        !password
      ) {
        setError(
          "Please enter your email and password."
        );

        return;
      }

      try {
        setIsSubmitting(true);

        await login({
          email:
            email.trim(),
          password,
        });

        await router.replace(
          "/admin/dashboard"
        );
      } catch (loginError) {
        const message =
          loginError instanceof Error
            ? loginError.message
            : "Unable to login.";

        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>
            Admin Login
          </title>
        </Head>

        <main className="flex min-h-screen items-center justify-center bg-[#f4f8fb]">
          <div className="flex flex-col items-center gap-3 text-[#06364a]">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#d8e9f0] border-t-[#06364a]" />

            <p className="text-sm font-medium">
              Checking session...
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          Admin Login
          {agency?.name
            ? ` | ${agency.name}`
            : ""}
        </title>

        <meta
          name="robots"
          content="noindex,nofollow"
        />
      </Head>

      <main className="min-h-screen bg-[#f4f8fb]">
        <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden min-h-screen overflow-hidden lg:block">
            <Image
              src="/images/admin-login-travel.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 53vw, 0px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#06364a]/95 via-[#06364a]/75 to-[#06364a]/35" />

            <div className="relative z-10 flex h-full flex-col justify-between px-12 py-12 xl:px-16">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#06364a]">
                    <Plane
                      size={18}
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      Admin Portal
                    </p>

                    <p className="font-semibold">
                      {agency?.name ||
                        "Time Travels"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-xl pb-10 text-white">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#9dddf3]">
                  Travel Operations
                </p>

                <h1 className="font-serif text-5xl leading-[1.08] xl:text-6xl">
                  Manage every journey
                  with clarity.
                </h1>

                <p className="mt-6 max-w-lg text-base leading-7 text-white/80">
                  View enquiries, manage
                  upcoming tours, check
                  bookings and keep daily
                  travel operations organized
                  from one secure dashboard.
                </p>

                <div className="mt-8 flex items-center gap-3 text-sm text-white/75">
                  <ShieldCheck
                    size={19}
                  />

                  <span>
                    Secure agency admin access
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/55">
                Authorized administrators only
              </p>
            </div>
          </section>

          <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-[460px]">
              <div className="mb-10 lg:hidden">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06364a] text-white shadow-md">
                  <Plane
                    size={22}
                  />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4d8499]">
                  {agency?.name ||
                    "Time Travels"}
                </p>

                <h1 className="mt-2 font-serif text-4xl text-[#06364a]">
                  Admin Portal
                </h1>
              </div>

              <div className="rounded-[28px] border border-[#dfeaf0] bg-white p-6 shadow-[0_20px_70px_rgba(6,54,74,0.09)] sm:p-9">
                <div className="mb-8">
                  <div className="mb-5 hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#06364a] text-white lg:flex">
                    <LockKeyhole
                      size={22}
                    />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4d8499]">
                    Welcome Back
                  </p>

                  <h2 className="mt-2 font-serif text-4xl text-[#06364a]">
                    Sign in to continue
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter your admin credentials
                    to access the agency dashboard.
                  </p>
                </div>

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#123c4d]"
                    >
                      Email address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7898a5]"
                      />

                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(
                          event
                        ) =>
                          setEmail(
                            event.target.value
                          )
                        }
                        placeholder="Enter your email"
                        className="h-12 w-full rounded-xl border border-[#d7e4ea] bg-[#fbfdfe] pl-12 pr-4 text-sm text-[#153d4c] outline-none transition placeholder:text-slate-400 focus:border-[#4bc4ef] focus:ring-4 focus:ring-[#4bc4ef]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-[#123c4d]"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7898a5]"
                      />

                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="current-password"
                        value={
                          password
                        }
                        onChange={(
                          event
                        ) =>
                          setPassword(
                            event.target.value
                          )
                        }
                        placeholder="Enter your password"
                        className="h-12 w-full rounded-xl border border-[#d7e4ea] bg-[#fbfdfe] pl-12 pr-12 text-sm text-[#153d4c] outline-none transition placeholder:text-slate-400 focus:border-[#4bc4ef] focus:ring-4 focus:ring-[#4bc4ef]/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current
                          )
                        }
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7898a5] transition hover:text-[#06364a]"
                      >
                        {showPassword ? (
                          <EyeOff
                            size={18}
                          />
                        ) : (
                          <Eye
                            size={18}
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#06364a] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0a455c] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In

                        <Plane
                          size={17}
                        />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-7 flex items-start gap-3 rounded-xl bg-[#eef8fc] p-4">
                  <ShieldCheck
                    size={19}
                    className="mt-0.5 shrink-0 text-[#0b749c]"
                  />

                  <p className="text-xs leading-5 text-[#52727f]">
                    This portal is restricted
                    to authorized agency
                    administrators. Your session
                    is protected with secure
                    authentication.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-center text-xs text-slate-400">
                © {new Date().getFullYear()}{" "}
                {agency?.name ||
                  "Time Travels"}
                . Admin Portal.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminLoginPage;