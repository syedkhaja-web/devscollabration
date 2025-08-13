
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, UploadCloud, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DeployPage() {

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Add a toast notification here if you have one
    }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <UploadCloud className="mx-auto h-16 w-16 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight mt-4">Deploy Your Application</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your application is configured for deployment to Firebase App Hosting. Follow the steps below to go live.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mt-12 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">1</div>
                  <span>Install the Firebase CLI</span>
                </CardTitle>
                <CardDescription>
                  If you haven't already, you need to install the Firebase Command Line Interface.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-4 flex items-center justify-between">
                    <code className="text-sm font-mono">npm install -g firebase-tools</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard('npm install -g firebase-tools')}>Copy</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">2</div>
                  <span>Login to Firebase</span>
                </CardTitle>
                <CardDescription>
                  Log in to your Google account to connect the CLI to Firebase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-md p-4 flex items-center justify-between">
                    <code className="text-sm font-mono">firebase login</code>
                     <Button variant="ghost" size="sm" onClick={() => copyToClipboard('firebase login')}>Copy</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">3</div>
                  <span>Deploy to App Hosting</span>
                </CardTitle>
                 <CardDescription>
                  This command will build and deploy your application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="bg-muted rounded-md p-4 flex items-center justify-between">
                    <code className="text-sm font-mono">firebase deploy --only apphosting</code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard('firebase deploy --only apphosting')}>Copy</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold mt-4">You're All Set!</h2>
             <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Once deployed, your application will be live. You can manage your app, view analytics, and set up custom domains in the Firebase Console.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button asChild>
                    <Link href={`https://devs-tec-collab.web.app`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Site
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href={`https://console.firebase.google.com/project/devs-tec-collab/hosting/main`} target="_blank">
                        Go to Firebase Console
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
