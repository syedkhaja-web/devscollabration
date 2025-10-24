
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'README.md Generator',
    description: 'Generate a professional README file for your project in seconds. Provide a name, description, and key features to get started.',
    href: '/ai-tools/readme-generator',
    icon: <FileCode className="h-8 w-8 text-primary" />,
  },
  // More tools can be added here in the future
];

export default function AiToolsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 text-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container relative">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                    AI-Powered Developer Tools
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Leverage the power of AI to streamline your workflow and accelerate your development process.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
              {tools.map((tool) => (
                <Link href={tool.href} key={tool.title} className="block rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary h-full">
                    <Card className="flex flex-col h-full border-0">
                      <CardHeader className="flex-row gap-4 items-center">
                        {tool.icon}
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
