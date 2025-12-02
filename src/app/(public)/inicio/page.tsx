import Header from "@/src/app/(public)/inicio/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Precific",
};

export default function LandingPage() {
  return <Header />;
}
