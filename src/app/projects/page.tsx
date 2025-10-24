
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SiteHeader } from '@/components/site-header';
import { PlusCircle, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase, useUser, useCollection, WithId, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

type Project = {
  name: string;
  description: string;
  url: string;
  ownerId: string;
};

export default function ProjectsPage() {
  const [newProject, setNewProject] = useState({ name: '', description: '', url: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const projectsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'projects');
  }, [firestore]);
  
  const userProjectsQuery = useMemoFirebase(() => {
    if (!projectsCollection || !user) return null;
    return collection(firestore, 'projects');
  }, [projectsCollection, user]);

  const { data: projects, isLoading: areProjectsLoading } = useCollection<Project>(userProjectsQuery);

  const handleAddProject = () => {
    if (newProject.name && newProject.description && newProject.url && user && projectsCollection) {
      const projectData: Project = { ...newProject, ownerId: user.uid };
      addDocumentNonBlocking(projectsCollection, projectData);
      setNewProject({ name: '', description: '', url: '' });
      setIsDialogOpen(false);
      toast({
        title: 'Project Added',
        description: `${newProject.name} has been added to your list.`,
      });
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (!firestore) return;
    const projectRef = doc(firestore, 'projects', projectId);
    deleteDocumentNonBlocking(projectRef);
    toast({
      title: 'Project Deleted',
      description: 'The project has been removed from your list.',
    });
  };

  const isLoading = isUserLoading || areProjectsLoading;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
              <p className="text-muted-foreground">Add and manage your personal and collaborative projects.</p>
            </div>
            {user && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new project to your list.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        className="col-span-3"
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="description" className="text-right pt-2">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="col-span-3"
                        placeholder="A short description of your project."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="url" className="text-right">
                        Repo URL
                      </Label>
                      <Input
                        id="url"
                        value={newProject.url}
                        onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                        className="col-span-3"
                        placeholder="https://github.com/user/repo"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddProject}>Add Project</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
             {isLoading ? (
                 Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton key={index} className="h-48 w-full" />
                 ))
            ) : projects && projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id} className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Repository
                    </Link>
                    {user?.uid === project.ownerId && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this project.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteProject(project.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-card rounded-lg border-2 border-dashed">
                <h2 className="text-xl font-semibold">No Projects Yet</h2>
                <p className="text-muted-foreground mt-2">{user ? 'Click "Add New Project" to get started.' : 'Please sign in to add projects.'}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
