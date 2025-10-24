
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Github, Linkedin, Rocket, Search, Twitter, Users } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { RepoCard } from '@/components/repo-card';
import { DevsTecIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import anime from 'animejs';
import Image from 'next/image';

export default function Home() {

  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Collaborate Globally',
      description: 'Connect with developers from around the world. Share ideas, contribute to projects, and grow your network.',
    },
    {
      icon: <GitBranch className="h-10 w-10 text-primary" />,
      title: 'Version Control & Repos',
      description: 'Host and review code, manage projects, and build software alongside millions of other developers.',
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: 'Fast Deployments',
      description: 'Automate your development process from code to cloud. Our integrated CI/CD tools make it easy to deploy.',
    },
  ];

  const repos = [
    { name: 'microsoft/AI-Toolbox', description: 'A curated list of AI tools and resources.', language: 'TypeScript', languageColor: '#3178c6', stars: 1250, forks: 230, url: 'https://github.com/microsoft/AI-Toolbox' },
    { name: 'producthunt/react-kanban-board', description: 'A drag-and-drop Kanban board built with React.', language: 'JavaScript', languageColor: '#f1e05a', stars: 842, forks: 150, url: 'https://github.com/producthunt/react-kanban-board' },
    { name: 'vercel/nextjs-commerce', description: 'A feature-rich starter template for e-commerce sites.', language: 'TypeScript', languageColor: '#3178c6', stars: 2100, forks: 450, url: 'https://github.com/vercel/nextjs-commerce' },
    { name: 'go-kit/kit', description: 'A toolkit for building microservices in Go.', language: 'Go', languageColor: '#00ADD8', stars: 980, forks: 120, url: 'https://github.com/go-kit/kit' },
    { name: 'bevyengine/bevy', description: 'A lightweight 2D game engine written in Rust.', language: 'Rust', languageColor: '#dea584', stars: 600, forks: 78, url: 'https://github.com/bevyengine/bevy' },
    { name: 'facebook/docusaurus', description: 'Official documentation for the Devs Tec platform.', language: 'Markdown', languageColor: '#083fa1', stars: 300, forks: 45, url: 'https://github.com/facebook/docusaurus' },
  ];

  useEffect(() => {
    const animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: 800
      });
  
      animation
        .add({
          targets: '.hero-element',
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(150)
        })
        .add({
          targets: '.feature-card',
          translateY: [20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100)
        }, '-=600');
    
  }, []);

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 lg:py-40 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container relative">
                <h1 className="hero-element text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-foreground">
                    Where Developers Collaborate
                </h1>
                <p className="hero-element mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
                    The ultimate platform for developers to host and review code, manage projects, and build software together.
                </p>
                <div className="hero-element mt-8 flex justify-center">
                    <Button size="lg" className="text-lg" asChild>
                      <Link href="/projects">Get Started</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="feature-card opacity-0 flex flex-col items-center text-center p-6 bg-card rounded-xl border-2 border-primary/20 shadow-lg shadow-primary/10">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Explore Popular Repositories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <Link href={repo.url} key={repo.name} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <RepoCard {...repo} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-secondary">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <DevsTecIcon className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Devs Tec, Inc.</p>
          </div>
          <div className="flex max-w-lg w-full">
            <Input
                type="search"
                placeholder="Search for anything..."
                className="rounded-r-none focus:ring-0 focus:ring-offset-0"
            />
            <Button type="submit" className="rounded-l-none">
                <Search className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Contact</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Privacy</Link>
          </nav>
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
