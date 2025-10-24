
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, UploadCloud, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DeployPage() {

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <UploadCloud className="mx-auto h-16 w-16 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight mt-4">Deploy Your Application</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The best way to deploy your Next.js application is with an automated Git-based workflow. This is the modern standard for web development.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-12 space-y-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Step 1: Push to GitHub</CardTitle>
                    <CardDescription>
                        Your code must live in a GitHub repository. If you haven't done this already, create a repository and push your code.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant="outline">
                        <Link href="https://github.com/new" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Create a New Repository
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <div className="text-center">
                <h2 className="text-2xl font-bold">Step 2: Choose Your Hosting Provider</h2>
                <p className="text-muted-foreground mt-2">Both Vercel and Firebase offer excellent, modern hosting for Next.js apps.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Option A: Deploy with Vercel</CardTitle>
                        <CardDescription>
                            The easiest way to deploy a Next.js app, from the creators of Next.js.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            1. Sign up for a Vercel account.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            2. Connect your GitHub account and select your project repository.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            3. Vercel will automatically detect the Next.js settings and deploy your site.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Deploy to Vercel
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Option B: Deploy with Firebase</CardTitle>
                        <CardDescription>
                            This project is pre-configured for one-click deployment to Firebase App Hosting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            1. Go to your Firebase project console.
                        </p>
                        <p className="text-sm text-muted-foreground">
                           2. Navigate to the App Hosting section and connect your GitHub repository.
                        </p>
                        <p className="text-sm text-muted-foreground">
                           3. Firebase will automatically build and deploy your application.
                        </p>
                         <Button asChild className="w-full" variant="outline">
                            <Link href={`https://console.firebase.google.com/project/devs-tec-collab/hosting/main`} target="_blank">
                                Go to Firebase Console
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
          </div>

          <div className="text-center mt-16">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold mt-4">You're All Set!</h2>
             <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              After connecting your repository, your site will be deployed automatically. You can manage your app, view analytics, and set up custom domains in your hosting provider's dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
