import HeroSection from "@/src/app/(public)/inicio/components/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific",
};

export default function LandingPage() {
  return <HeroSection />;
}
