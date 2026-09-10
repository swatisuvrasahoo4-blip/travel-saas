import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import {
  AgencyProvider,
  useAgency,
} from "@/context/AgencyContext";

import {
  EnquiryProvider,
} from "@/components/enquiry/EnquiryProvider";

import EnquiryModal from "@/components/enquiry/EnquiryModal";

import FloatingContactButtons from "@/components/layout/FloatingContactButtons";

const AgencyHead = () => {
  const { agency } = useAgency();

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

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <AgencyProvider>
      <EnquiryProvider>
        <AgencyHead />

        <Component {...pageProps} />

        <FloatingContactButtons />

        <EnquiryModal />
      </EnquiryProvider>
    </AgencyProvider>
  );
}