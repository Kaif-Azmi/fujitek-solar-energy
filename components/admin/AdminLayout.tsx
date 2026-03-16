"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PublicIcon, type PublicIconName } from "@/components/ui/icons";

type Props = {
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", iconName: "network" },
  { href: "/admin/products", label: "Products", iconName: "solar-panel" },
  { href: "/admin/services", label: "Services", iconName: "support" },
  { href: "/admin/projects", label: "Projects", iconName: "truck" },
  { href: "/admin/banners", label: "Banners", iconName: "solar-panel" },
  { href: "/admin/blog", label: "Blog", iconName: "savings" },
  { href: "/admin/leads", label: "Leads", iconName: "support" },
];

export default function AdminLayoutShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 p-4 md:grid-cols-[260px_1fr] md:p-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Fujitek Solar</p>
            <h2 className="text-lg font-bold text-slate-900">Admin Panel</h2>
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <PublicIcon name={item.iconName as PublicIconName} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <PublicIcon name="support" className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </aside>

        <main className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
