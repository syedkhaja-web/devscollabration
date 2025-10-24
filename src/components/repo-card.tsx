import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitFork, Star } from 'lucide-react';

type RepoCardProps = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
};

export function RepoCard({ name, description, language, languageColor, stars, forks }: Omit<RepoCardProps, 'url'>) {
  return (
    <Card className="flex h-full flex-col rounded-xl transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-xl hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <CardDescription className="pt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mt-auto flex items-center text-sm text-muted-foreground gap-x-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: languageColor }} />
          <span>{language}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4" />
          <span>{stars.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitFork className="h-4 w-4" />
          <span>{forks.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
