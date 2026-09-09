import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { AgencyProvider, useAgency } from "@/context/AgencyContext";

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
      <AgencyHead />

      <Component {...pageProps} />
    </AgencyProvider>
  );
}