
'use client';

import { Button } from '@/components/ui/button';
import { DevsTecIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <DevsTecIcon className="h-12 w-12 text-primary" />
        </div>
        <div className="p-8 rounded-xl bg-card border">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in with your Google account to continue.
          </p>
          <div className="mt-8">
            <Button onClick={handleSignIn} className="w-full" size="lg">
              Sign In with Google
            </Button>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted-foreground/80 px-8">
          By continuing, you acknowledge you have read and agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
