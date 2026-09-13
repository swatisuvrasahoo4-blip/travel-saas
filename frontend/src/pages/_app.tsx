import "@/styles/globals.css";

import type {
  AppProps,
} from "next/app";
import Head from "next/head";
import {
  useRouter,
} from "next/router";

import {
  AgencyProvider,
  useAgency,
} from "@/context/AgencyContext";

import {
  EnquiryProvider,
} from "@/components/enquiry/EnquiryProvider";

import {
  AdminAuthProvider,
} from "@/context/AdminAuthContext";

import EnquiryModal from "@/components/enquiry/EnquiryModal";
import FloatingContactButtons from "@/components/layout/FloatingContactButtons";

/* =========================================
   DYNAMIC AGENCY HEAD
========================================= */

const AgencyHead = () => {
  const {
    agency,
  } = useAgency();

  return (
    <Head>
      <link
        rel="icon"
        type="image/png"
        href={
          agency?.favicon ||
          "/favicon.ico"
        }
      />

      <link
        rel="apple-touch-icon"
        href={
          agency?.favicon ||
          "/favicon.ico"
        }
      />
    </Head>
  );
};

/* =========================================
   APP CONTENT
========================================= */

const AppContent = ({
  Component,
  pageProps,
}: AppProps) => {
  const router =
    useRouter();

  const isAdminPage =
    router.pathname.startsWith(
      "/admin"
    );

  return (
    <>
      <AgencyHead />

      <Component
        {...pageProps}
      />

      {!isAdminPage && (
        <>
          <FloatingContactButtons />

          <EnquiryModal />
        </>
      )}
    </>
  );
};

/* =========================================
   APP
========================================= */

export default function App(
  props: AppProps
) {
  return (
    <AgencyProvider>
      <AdminAuthProvider>
        <EnquiryProvider>
          <AppContent
            {...props}
          />
        </EnquiryProvider>
      </AdminAuthProvider>
    </AgencyProvider>
  );
}