
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { DevsTecIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useAuth } from '@/firebase';
import { signInAnonymously, signOut } from 'firebase/auth';

export default function LoginPage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!auth) return;
    setActionLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (error: any) {
      console.error("Failed to sign in:", error);
      if (error.code === 'auth/operation-not-allowed') {
        toast({
            title: "Sign-In Failed",
            description: "Anonymous Sign-In is not enabled in the Firebase Console.",
            variant: "destructive",
        });
      } else {
        toast({
            title: "Sign-In Failed",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
        });
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    setActionLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center bg-secondary">
          <Loader2 className="h-12 w-12 animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <DevsTecIcon className="h-12 w-12" />
            </div>
            {user ? (
              <>
                <CardTitle className="text-2xl">You are signed in</CardTitle>
                <CardDescription>
                  Welcome! You can now explore the platform.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl">Launch the Application</CardTitle>
                <CardDescription>
                  Sign in anonymously to start your session and explore the platform.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {user ? (
              <>
                <Button onClick={handleSignOut} size="lg" variant="outline" disabled={actionLoading}>
                  {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign Out
                </Button>
                <Button asChild size="lg">
                  <Link href="/">Explore Application</Link>
                </Button>
              </>
            ) : (
              <Button onClick={handleSignIn} size="lg" disabled={actionLoading}>
                {actionLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In Anonymously
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
