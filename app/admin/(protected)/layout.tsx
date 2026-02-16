import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import AdminLayoutShell from "@/components/admin/AdminLayout";

interface Props {
  children: ReactNode;
}

export default async function AdminProtectedLayout({ children }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  const session = await verifyAdminSessionToken(token);

  if (!session) redirect("/admin/login");

  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
