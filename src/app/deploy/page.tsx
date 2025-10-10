
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
              The best way to deploy your application is with an automated Git-based workflow. This is the modern standard for web development.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mt-12 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">1</div>
                  <span>Push to a GitHub Repository</span>
                </CardTitle>
                <CardDescription>
                  Your code needs to live in a GitHub repository. This allows hosting providers to automatically access it.
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">2</div>
                  <span>Connect Your Hosting Provider</span>
                </CardTitle>
                <CardDescription>
                  Connect your hosting provider (like Firebase App Hosting or Vercel) to your GitHub account and select your repository.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                    This project is pre-configured for Firebase App Hosting, but works great on Vercel too. During the setup process, the provider will automatically detect that this is a Next.js project.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">3</div>
                  <span>Deploy Automatically</span>
                </CardTitle>
                 <CardDescription>
                  Once connected, your provider will build and deploy your site. Every time you `git push` new changes, a new deployment will happen automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="bg-muted rounded-md p-4">
                    <code className="text-sm font-mono">git push origin main</code>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="text-2xl font-bold mt-4">You're All Set!</h2>
             <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              You can manage your app, view analytics, and set up custom domains in your hosting provider's dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button asChild>
                    <Link href={`https://devs-tec-collab.web.app`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Firebase Site
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
