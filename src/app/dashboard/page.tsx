'use client';

import { useAuth } from '@/hooks/use-auth';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex flex-1 items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        </div>
    )
  }

  if (!user) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You must be signed in to view this page.</p>
                <Button asChild>
                    <Link href="/login">Sign In</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          This is your authenticated space. Your email is {user.email}.
        </p>
      </main>
    </div>
  );
}
