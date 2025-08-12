
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { DevsTecIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <DevsTecIcon className="h-12 w-12" />
            </div>
            <CardTitle className="text-2xl">Launch the Application</CardTitle>
            <CardDescription>
              Click the button below to start your session and explore the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg">
              <Link href="/">Launch Application</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
