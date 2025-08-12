
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { DevsTecIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80">
          <DevsTecIcon className="h-6 w-6" />
          <span className="font-bold">Devs Tec</span>
        </Link>
      </div>
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to continue.
        </p>
        <div className="mt-8">
            <Button onClick={signInWithGoogle} className="w-full" size="lg">
                Sign In with Google
            </Button>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
