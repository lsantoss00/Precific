"use client";

import GetAheadSection from "@/src/app/(landing)/components/get-ahead-section";
import HeroSection from "@/src/app/(landing)/components/hero-section";
import LogoSection from "@/src/app/(landing)/components/logo-section";
import ReasonsSection from "@/src/app/(landing)/components/reasons-section";
import StartUsingSection from "@/src/app/(landing)/components/start-using-section";
import ValuePropositionSection from "@/src/app/(landing)/components/value-proposition-section";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ContactSection = dynamic(
  () => import("@/src/app/(landing)/components/contact-section"),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import("@/src/app/(landing)/components/faq-section"),
  { ssr: true }
);

export default function LandingPageContent() {
  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <ReasonsSection />
      <GetAheadSection />
      <ValuePropositionSection />
      <LogoSection />
      <ContactSection />
      <StartUsingSection />
      <FAQSection />
    </>
  );
}
