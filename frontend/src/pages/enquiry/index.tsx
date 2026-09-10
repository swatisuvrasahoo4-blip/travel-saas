import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/router";

import {
  useEnquiry,
} from "@/components/enquiry/EnquiryProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const EnquiryPage = () => {
  const router = useRouter();

  const {
    openEnquiry,
  } = useEnquiry();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    openEnquiry({
      source: "general",
    });
  }, [
    router.isReady,
    openEnquiry,
  ]);

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] bg-[#fffaf3]" />

      <Footer />
    </>
  );
};

export default EnquiryPage;