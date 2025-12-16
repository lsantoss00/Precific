"use client";

import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  amount?: number;
  className?: string;
  as?:
    | "div"
    | "section"
    | "article"
    | "aside"
    | "header"
    | "footer"
    | "main"
    | "figure"
    | "li"
    | "nav"
    | "span";
  offset?: number;
}

const createFadeInVariants = (
  offset: number
): Record<AnimationDirection, Variants> => ({
  up: {
    hidden: {
      opacity: 0,
      y: offset,
      transform: `translate3d(0, ${offset}px, 0)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      transform: "translate3d(0, 0, 0)",
    },
  },
  down: {
    hidden: {
      opacity: 0,
      y: -offset,
      transform: `translate3d(0, ${-offset}px, 0)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      transform: "translate3d(0, 0, 0)",
    },
  },
  left: {
    hidden: {
      opacity: 0,
      x: offset,
      transform: `translate3d(${offset}px, 0, 0)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      transform: "translate3d(0, 0, 0)",
    },
  },
  right: {
    hidden: {
      opacity: 0,
      x: -offset,
      transform: `translate3d(${-offset}px, 0, 0)`,
    },
    visible: {
      opacity: 1,
      x: 0,
      transform: "translate3d(0, 0, 0)",
    },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
});

const reducedMotionVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 0,
    transform: "translate3d(0, 0, 0)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transform: "translate3d(0, 0, 0)",
  },
};

const SMOOTH_EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

const motionComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  figure: motion.figure,
  li: motion.li,
  nav: motion.nav,
  span: motion.span,
} as const;

const FadeInOnScroll = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  amount = 0.1,
  className,
  as = "div",
  offset = 24,
}: FadeInOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    amount,
    margin: "100px 0px 0px 0px",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const variants = useMemo(() => {
    if (prefersReducedMotion) {
      return reducedMotionVariants;
    }
    return createFadeInVariants(offset)[direction];
  }, [prefersReducedMotion, offset, direction]);

  const transition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.2 : duration,
      delay: prefersReducedMotion ? 0 : delay,
      ease: SMOOTH_EASING,
    }),
    [prefersReducedMotion, duration, delay]
  );

  const MotionComponent = motionComponents[as];

  return (
    <MotionComponent
      ref={ref}
      initial={isMounted ? "hidden" : false}
      animate={isMounted && isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </MotionComponent>
  );
};

export default FadeInOnScroll;
