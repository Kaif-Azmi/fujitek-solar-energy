import type { Metadata } from "next";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

// Root admin layout: no protection here; (protected) group has its own layout
export default function AdminLayout({ children }: Props) {
  return <>{children}</>;
}
