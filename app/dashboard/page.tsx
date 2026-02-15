import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect('/admin/login');
  const role = (session as { role?: string }).role;
  if (role === 'admin') redirect('/admin');
  const user = (session as { user?: { name?: string | null; email?: string | null } }).user;

  return (
    <div className="min-h-screen bg-surface py-section">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl text-strong text-foreground mb-2">My Account</h1>
        <p className="text-secondary mb-8">
          Welcome back{user?.name ? `, ${user.name}` : ''}. Your saved details are used when you contact us or request product information.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Account details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user?.name && (
              <p className="text-secondary"><span className="font-medium text-foreground">Name:</span> {user.name}</p>
            )}
            <p className="text-secondary"><span className="font-medium text-foreground">Email:</span> {user?.email ?? '—'}</p>
          </CardContent>
        </Card>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact">
            <Button variant="default" size="lg">Contact us</Button>
          </Link>
          <Link href="/products">
            <Button variant="secondary" size="lg">View products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

