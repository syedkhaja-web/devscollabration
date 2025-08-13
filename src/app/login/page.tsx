
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { DevsTecIcon } from '@/components/icons';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signInAnonymously, signOut, User } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Failed to sign in:", error);
      console.error("Please ensure Anonymous Sign-In is enabled in your Firebase project's Authentication settings.");
    } finally {
      // onAuthStateChanged will set loading to false
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Failed to sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
                  You can now explore the platform. Ready to sign out?
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl">Launch the Application</CardTitle>
                <CardDescription>
                  Click the button below to start your session and explore the platform.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {user ? (
              <>
                <Button onClick={handleSignOut} size="lg" variant="outline" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign Out
                </Button>
                <Button asChild size="lg">
                  <Link href="/">Explore Application</Link>
                </Button>
              </>
            ) : (
              <Button onClick={handleSignIn} size="lg" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
