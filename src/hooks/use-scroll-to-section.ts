"use client";

import { usePathname, useRouter } from "next/navigation";

export function useScrollToSection() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      sessionStorage.setItem("scrollToSection", sectionId);
      router.push("/");
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const scrollToTop = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return { scrollToSection, scrollToTop };
}
