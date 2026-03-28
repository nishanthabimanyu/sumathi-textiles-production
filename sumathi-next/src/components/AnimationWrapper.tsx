"use client";

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition wrapper for smooth route changes.
 * Place this inside the main layout.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * FadeIn animation for sections and elements.
 */
interface FadeInProps extends HTMLMotionProps<"div"> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
}

export function FadeIn({ children, direction = 'up', delay = 0, ...props }: FadeInProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer for lists of items (e.g. Products, Collections).
 */
export function StaggerContainer({ children, delayChildren = 0, staggerChildren = 0.1, ...props }: HTMLMotionProps<"div"> & { delayChildren?: number, staggerChildren?: number }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn animation for icons and buttons.
 */
export function ScaleIn({ children, delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
