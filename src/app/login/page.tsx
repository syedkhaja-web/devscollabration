
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-secondary">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription>
              This page has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" className="text-primary hover:underline">
              Return to the homepage
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
