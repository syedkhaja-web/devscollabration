'use client';

import { Button } from '@/components/ui/button';
import { DevsTecIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="AI generated wolf"
        data-ai-hint="wolf ai"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-sm text-center">
        <div className="flex justify-center mb-8">
          <DevsTecIcon className="h-12 w-12 text-primary" />
        </div>
        <div className="p-8 rounded-lg bg-card/80 backdrop-blur-sm">
          <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to access the platform.
          </p>
          <div className="mt-8">
            <Button onClick={handleSignIn} className="w-full" size="lg">
              Sign In with Google
            </Button>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground/80">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
