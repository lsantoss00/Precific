import GetAheadSection from "@/src/app/(public)/inicio/components/get-ahead-section";
import HeroSection from "@/src/app/(public)/inicio/components/hero-section";
import ReasonsSection from "@/src/app/(public)/inicio/components/reasons-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific",
};

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ReasonsSection />
      <GetAheadSection />
    </>
  );
}
