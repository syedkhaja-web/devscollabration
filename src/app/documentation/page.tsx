
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Rocket } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="space-y-2 mb-12">
            <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Find all the information you need to get started and use the Devs Tec platform effectively.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Rocket className="h-6 w-6 text-primary" />
                  <span>Getting Started</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  An overview of the platform and a step-by-step guide to setting up your first project.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-primary" />
                  <span>API Reference</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Detailed documentation on our API endpoints, including examples for common use cases.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span>Guides & Tutorials</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  In-depth tutorials and guides for advanced features and integrations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

           <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold">Still have questions?</h2>
                <p className="text-muted-foreground mt-2">
                    Our support team is here to help. Reach out to us anytime.
                </p>
            </div>

        </div>
      </main>
    </div>
  );
}
