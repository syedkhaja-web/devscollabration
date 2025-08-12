
'use client';

import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Lightbulb, Video } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'AI-Powered Code Reviewer',
    description: 'An intelligent tool that automatically reviews pull requests, suggests improvements, and identifies potential bugs using machine learning.',
    tags: ['AI', 'Machine Learning', 'TypeScript'],
    teamSize: 5,
    status: 'Actively Recruiting',
  },
  {
    title: 'Decentralized Social Network',
    description: 'A privacy-focused social media platform built on blockchain technology, giving users full control over their data.',
    tags: ['Blockchain', 'React', 'Go'],
    teamSize: 8,
    status: 'Actively Recruiting',
  },
  {
    title: 'Open Source Game Engine',
    description: 'A lightweight and cross-platform 2D game engine written in Rust, designed for indie developers and hobbyists.',
    tags: ['Rust', 'GameDev', 'WASM'],
    teamSize: 12,
    status: 'Near Capacity',
  },
    {
    title: 'Real-time Collaborative Editor',
    description: 'A web-based editor that allows multiple users to write and edit code together in real-time, similar to Google Docs.',
    tags: ['Web Sockets', 'React', 'Node.js'],
    teamSize: 4,
    status: 'Open for Contribution',
  },
];

export default function CollaboratePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 text-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container relative">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                    Find Your Next Project
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Join forces with talented developers from around the world. Discover innovative projects and contribute to the future of technology.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Open for Collaboration
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {projects.map((project, index) => (
                <Card key={index} className="flex flex-col rounded-xl overflow-hidden h-full border transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="pt-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-4 pt-2">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            <span>{project.teamSize} Members</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Lightbulb className="h-4 w-4" />
                            <span>{project.status}</span>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 p-4">
                    <Button asChild className="w-full">
                        <Link href="https://meet.new" target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" />
                            Start a Meeting
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
