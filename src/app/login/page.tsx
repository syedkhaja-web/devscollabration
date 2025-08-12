'use client';

import { Button } from '@/components/ui/button';
import { DevsTecIcon } from '@/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80">
          <DevsTecIcon className="h-6 w-6" />
          <span className="font-bold">Devs Tec</span>
        </Link>
      </div>
      <div className="w-full max-w-sm text-center">
        <div className="h-64 w-full bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">3D Animation Placeholder</p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mt-8">Welcome Back</h1>
        <p className="mt-2 text-muted-foreground">
          Sign in to your account to continue.
        </p>
        <div className="mt-8">
            <Button onClick={handleSignIn} className="w-full" size="lg">
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
