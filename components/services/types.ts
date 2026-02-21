import type { ReactNode } from "react";

export type NavItem = {
  id: string;
  label: string;
};

export type HighlightItem = {
  label: string;
  value: string;
};

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ExpandableDetails = {
  summary: string;
  paragraphs: string[];
};
