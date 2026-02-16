import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import AdminCard from "@/components/admin/AdminCard";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  const session = await verifyAdminSessionToken(token);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Manage Products, Services, Projects, and Banners from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Products", value: "Manage", tone: "bg-blue-50 text-blue-700" },
          { label: "Services", value: "Manage", tone: "bg-emerald-50 text-emerald-700" },
          { label: "Projects", value: "Manage", tone: "bg-amber-50 text-amber-700" },
          { label: "Banners", value: "Manage", tone: "bg-violet-50 text-violet-700" },
        ].map((card) => (
          <AdminCard key={card.label}>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className={`mt-2 inline-flex rounded-md px-2 py-1 text-xs font-semibold ${card.tone}`}>
              {card.value}
            </p>
          </AdminCard>
        ))}
      </div>

      <AdminCard>
        <h2 className="text-lg font-semibold text-slate-900">Cloudinary Image Management</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use section pages to upload images securely, toggle active status, filter records, and delete images from Cloudinary.
        </p>
      </AdminCard>
    </div>
  );
}
