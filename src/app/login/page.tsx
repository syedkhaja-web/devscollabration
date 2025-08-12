
'use client';

import { useEffect } from 'react';
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import { DevsTecIcon } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Github, Chrome } from 'lucide-react';


export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, user } = useAuth();

  useEffect(() => {
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: '.login-card > *',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700,
      delay: anime.stagger(100)
    })
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in failed", error);
      // You could show a toast notification here
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <DevsTecIcon className="h-12 w-12 text-primary" />
        </div>
        <div className="login-card p-8 rounded-xl bg-card border">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue to Devs Tec.
          </p>
          <div className="mt-8">
            <Button onClick={handleSignIn} className="w-full" size="lg">
              <Chrome className="mr-2 h-5 w-5" />
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
