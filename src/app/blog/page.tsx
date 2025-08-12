
'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, User, Calendar, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { generateImage } from '@/ai/flows/generate-image-flow';
import { useToast } from "@/hooks/use-toast";


type Post = {
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  imageHint: string;
};

const initialPosts: Post[] = [
    {
        title: 'Building Modern Web Apps with Next.js',
        description: 'A deep dive into the features that make Next.js a powerhouse for modern web development, including Server Components and the App Router.',
        author: 'Jane Doe',
        date: '2024-07-21',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'web development'
    },
    {
        title: 'Mastering Tailwind CSS for Rapid UI Development',
        description: 'Learn how to leverage Tailwind CSS to build beautiful, responsive user interfaces faster than ever before. Includes tips and tricks.',
        author: 'John Smith',
        date: '2024-07-20',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'css framework'
    },
    {
        title: 'The Rise of AI in Collaborative Coding',
        description: 'Exploring how AI-powered tools are changing the way developer teams collaborate, write code, and solve problems.',
        author: 'Alex Johnson',
        date: '2024-07-19',
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'ai coding'
    },
];


export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState<Omit<Post, 'date' | 'imageUrl' | 'imageHint'>>({ title: '', description: '', author: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAddPost = async () => {
    if (newPost.title && newPost.description && newPost.author) {
      setIsGenerating(true);
      try {
        const { imageDataUri } = await generateImage({ prompt: newPost.title });
        const today = new Date().toISOString().split('T')[0];
        
        setPosts([
            { 
              ...newPost, 
              date: today, 
              imageUrl: imageDataUri,
              imageHint: newPost.title
            }, 
            ...posts
          ]);
        setNewPost({ title: '', description: '', author: '' });
        setIsDialogOpen(false);

      } catch (error) {
        console.error("Failed to generate image:", error);
        toast({
          title: "Image Generation Failed",
          description: "Could not generate an image for the post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">From the Blog</h1>
              <p className="text-lg text-muted-foreground">
                Latest news, articles, and updates from the Devs Tec team.
              </p>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to publish a new blog post.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="col-span-3"
                      placeholder="Your Post Title"
                      disabled={isGenerating}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newPost.description}
                      onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                      className="col-span-3"
                      placeholder="A short summary of your post."
                      disabled={isGenerating}
                    />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      Author
                    </Label>
                    <Input
                      id="author"
                      value={newPost.author}
                      onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                      className="col-span-3"
                      placeholder="Author's Name"
                      disabled={isGenerating}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddPost} disabled={isGenerating}>
                    {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isGenerating ? 'Publishing...' : 'Publish Post'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Card key={index} className="flex flex-col overflow-hidden rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary border">
                 <div className="relative h-56 w-full">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        data-ai-hint={post.imageHint}
                    />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl h-16">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground flex justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
