
'use client';

import { SiteHeader } from '@/components/site-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DevsTecIcon } from '@/components/icons';
import { BrainCircuit, HeartHandshake, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Alex Rivera',
    role: 'Founder & CEO',
    bio: 'Visionary leader with a passion for empowering developers.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'portrait man',
  },
  {
    name: 'Samantha Chen',
    role: 'Chief Technology Officer',
    bio: 'Expert in scalable systems and cutting-edge technology.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'portrait woman',
  },
  {
    name: 'David Lee',
    role: 'Lead UX Designer',
    bio: 'Crafting intuitive and beautiful experiences for our users.',
    imageUrl: 'https://placehold.co/400x400.png',
    imageHint: 'person portrait',
  },
];

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

const TeamMemberCard = ({ name, role, bio, imageUrl, imageHint }: (typeof teamMembers)[0]) => (
  <div className="group h-80 w-64 [perspective:1000px]">
    <div className="relative h-full w-full rounded-xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={name}
          width={256}
          height={320}
          className="h-full w-full rounded-xl object-cover shadow-xl"
          data-ai-hint={imageHint}
        />
      </div>
      <div className="absolute inset-0 h-full w-full rounded-xl bg-card px-6 py-8 text-center text-card-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="flex min-h-full flex-col items-center justify-center">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-base text-primary">{role}</p>
          <p className="mt-4 text-sm text-muted-foreground">{bio}</p>
        </div>
      </div>
    </div>
  </div>
);


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
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>
            <div className="flex flex-wrap justify-center gap-12">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} {...member} />
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
