import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import LogoutButton from '@/components/LogoutButton';

interface Props {
  children: ReactNode;
}

export default async function AdminProtectedLayout({ children }: Props) {
  const session = await getServerSession(authOptions as any);
  console.log("ADMIN SESSION >>>", JSON.stringify(session, null, 2));
  if (!session) redirect('/admin/login');
  const role = (session as { role?: string }).role;
  if (role !== 'admin') redirect('/');

  return (
    <div className="min-h-screen flex bg-blue-50">
      <aside className="w-64 bg-white border-r border-slate-200">
        <div className="p-4 border-b">
          <div className="text-lg text-strong">Admin Dashboard</div>
          <div className="text-sm text-slate-500">Development</div>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-blue-50">Dashboard</Link>
          <Link href="/admin/banners" className="block px-3 py-2 rounded hover:bg-blue-50">Banners</Link>
          <Link href="/admin/products" className="block px-3 py-2 rounded hover:bg-blue-50">Products</Link>
          <Link href="/admin/services" className="block px-3 py-2 rounded hover:bg-blue-50">Services</Link>
          <Link href="/admin/projects" className="block px-3 py-2 rounded hover:bg-blue-50">Projects</Link>
          <Link href="/admin/leads" className="block px-3 py-2 rounded hover:bg-blue-50">Leads</Link>
          <div className="mt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">Admin</h1>
        </header>
        <div className="bg-white border rounded shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

