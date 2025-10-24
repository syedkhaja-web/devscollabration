
'use client';

import { useState, useMemo } from 'react';
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
import { PlusCircle, User, Calendar, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { generateBlogPost } from '@/ai/flows/generate-blog-post-flow';
import { useToast } from "@/hooks/use-toast";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';


type Post = {
  title: string;
  description: string;
  author: string;
  authorId: string;
  createdAt: any;
};

export default function BlogPage() {
  const [newPost, setNewPost] = useState({ title: '', description: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const postsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'blog_posts');
  }, [firestore]);
  
  const postsQuery = useMemoFirebase(() => {
    if (!postsCollection) return null;
    return query(postsCollection, orderBy('createdAt', 'desc'));
  }, [postsCollection]);

  const { data: posts, isLoading: arePostsLoading } = useCollection<Post>(postsQuery);

  const handleGenerateDescription = async () => {
    if (!newPost.title) {
        toast({
            title: "Title is missing",
            description: "Please enter a title to generate a description.",
            variant: "destructive",
        });
        return;
    }
    setIsGeneratingDescription(true);
    try {
        const { description } = await generateBlogPost({ title: newPost.title });
        setNewPost(prev => ({...prev, description}));
    } catch (error) {
        console.error("Failed to generate description:", error);
        toast({
          title: "Description Generation Failed",
          description: "Could not generate a description for the post. Please try again.",
          variant: "destructive",
        });
    } finally {
        setIsGeneratingDescription(false);
    }
  };

  const handleAddPost = async () => {
    if (newPost.title && newPost.description && postsCollection) {
      setIsPublishing(true);
      const postData = {
        ...newPost,
        author: 'Anonymous',
        authorId: 'public',
        createdAt: serverTimestamp(),
      };
      
      addDocumentNonBlocking(postsCollection, postData);

      setNewPost({ title: '', description: '' });
      setIsDialogOpen(false);
      setIsPublishing(false);
      toast({
        title: 'Blog Post Published',
        description: 'Your new post is now live.',
      });
    }
  };

  const handleDeletePost = (postId: string) => {
    if (!firestore) return;
    const postRef = doc(firestore, 'blog_posts', postId);
    deleteDocumentNonBlocking(postRef);
    toast({
      title: 'Post Deleted',
      description: 'The blog post has been removed.',
    });
  };

  const isLoading = arePostsLoading;

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
                    disabled={isPublishing}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right pt-2">
                    Description
                  </Label>
                  <div className="col-span-3 space-y-2">
                      <Textarea
                        id="description"
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                        placeholder="A short summary of your post."
                        disabled={isPublishing || isGeneratingDescription}
                        rows={5}
                      />
                      <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full" 
                          onClick={handleGenerateDescription}
                          disabled={isPublishing || isGeneratingDescription || !newPost.title}
                      >
                          {isGeneratingDescription ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                              <Sparkles className="mr-2 h-4 w-4" />
                          )}
                          Generate with AI
                      </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddPost} disabled={isPublishing || isGeneratingDescription || !newPost.title || !newPost.description}>
                  {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isPublishing ? 'Publishing...' : 'Publish Post'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-64 w-full" />
              ))
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id} className="flex flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary">
                  <CardHeader>
                    <CardTitle className="text-xl h-16">{post.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                      <span>
                        {post.createdAt?.toDate ? format(post.createdAt.toDate(), 'PPP') : 'Just now'}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-card rounded-lg border-2 border-dashed">
                <h2 className="text-xl font-semibold">No Blog Posts Yet</h2>
                <p className="text-muted-foreground mt-2">Click "Add New Post" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
