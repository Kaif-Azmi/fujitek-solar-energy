import type { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import AdminLayoutShell from "@/components/admin/AdminLayout";

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

export default async function AdminProtectedLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  const session = await verifyAdminSessionToken(token);

  if (!session) redirect("/admin/login");

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
