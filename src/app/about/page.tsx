
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DevsTecIcon } from '@/components/icons';
import { HeartHandshake, Lightbulb, Users, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible, encouraging creative solutions and embracing new ideas.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Collaboration',
      description: 'We believe the best results come from working together. We foster an environment of teamwork and open communication.',
    },
    {
      icon: <HeartHandshake className="h-8 w-8 text-primary" />,
      title: 'Integrity',
      description: 'We operate with honesty and transparency, building trust with our community and our partners.',
    },
  ];

  const team = [
    {
      name: 'Alex Rivera',
      role: 'CEO & Founder',
      socials: {
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Samantha Chen',
      role: 'Chief Technology Officer',
      socials: {
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'David Lee',
      role: 'Lead Designer',
      socials: {
        linkedin: '#',
        github: '#',
      },
    },
     {
      name: 'Maria Garcia',
      role: 'Head of Engineering',
      socials: {
        linkedin: '#',
        github: '#',
      },
    },
  ];

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        
        <section className="relative py-20 md:py-32 text-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
            <div className="container relative">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                    Our Mission
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                To build the world's most powerful and intuitive platform for developer collaboration, empowering teams to create revolutionary software together.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet the Team
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                   <div className="flex gap-4 mt-2">
                    <Link href={member.socials.linkedin} aria-label={`${member.name}'s LinkedIn`}>
                      <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                    <Link href={member.socials.github} aria-label={`${member.name}'s GitHub`}>
                      <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Core Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-xl">
                  <div className="mb-4">{value.icon}</div>
                  <CardTitle className="mb-2 text-xl">{value.title}</CardTitle>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
