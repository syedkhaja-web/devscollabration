'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signInWithGoogle, loading, user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Sign in to your account using Google.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 74.8C297.3 114.5 274.2 104.2 248 104.2c-74.9 0-136.2 60.3-136.2 134.8s61.3 134.8 136.2 134.8c81.8 0 112.5-52.4 115.3-78.5H248v-95h239.1c.4 12.7 1.3 26.8 1.3 42.5z"></path></svg>
            )}
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
