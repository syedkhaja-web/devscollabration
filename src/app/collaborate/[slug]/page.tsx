
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Lightbulb, Video, Code } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => slugify(p.title) === params.slug);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {project ? (
          <div className="container py-12 md:py-20">
            <div className="mb-8">
                <Link href="/collaborate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    &larr; Back to all projects
                </Link>
            </div>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mt-2">{project.description}</p>
                <div className="flex items-center text-muted-foreground gap-6 mt-8">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>{project.teamSize} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" />
                        <span>{project.status}</span>
                    </div>
                </div>

                <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row gap-4">
                    <Button asChild className="w-full sm:w-auto" variant="outline">
                        <Link href="https://vscode.dev/" target="_blank" rel="noopener noreferrer">
                            <Code className="mr-2 h-4 w-4" />
                            Open in VS Code
                        </Link>
                    </Button>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="https://meet.new" target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" />
                            Start a Meeting
                        </Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="text-muted-foreground mt-2">The project you are looking for does not exist.</p>
            <Button asChild className="mt-6">
              <Link href="/collaborate">Back to projects</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
