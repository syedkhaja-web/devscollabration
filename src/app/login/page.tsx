
'use client';

import { DevsTecIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <DevsTecIcon className="h-12 w-12 text-primary" />
        </div>
        <div className="p-8 rounded-xl bg-card border">
          <h1 className="text-3xl font-bold tracking-tight">Sign In</h1>
          <p className="mt-2 text-muted-foreground">
            Click the button below to continue to the application.
          </p>
          <Button asChild className="mt-6 w-full">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
