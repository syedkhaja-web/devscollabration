
'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateReadme } from '@/ai/flows/generate-readme-flow';

export default function ReadmeGeneratorPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
  });
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenerateReadme = async () => {
    if (!formData.name || !formData.description) {
      toast({
        title: 'Missing Fields',
        description: 'Please provide at least a project name and description.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedReadme('');
    try {
      const result = await generateReadme(formData);
      setGeneratedReadme(result.readme);
    } catch (error) {
      console.error('Failed to generate README:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate the README. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
    setIsCopied(true);
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight">README.md Generator</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Create a professional README for your project with the help of AI.
                </p>
            </div>
            
            <div className="grid gap-12 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" placeholder="My Awesome Project" value={formData.name} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea id="description" placeholder="A brief summary of what your project does." value={formData.description} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="features">Key Features (comma-separated)</Label>
                            <Textarea id="features" placeholder="e.g., User authentication, Real-time collaboration, AI integration" value={formData.features} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <Button onClick={handleGenerateReadme} disabled={isLoading} className="w-full">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate README
                        </Button>
                    </CardContent>
                </Card>

                <Card className="relative">
                    <CardHeader>
                        <CardTitle>Generated README</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {generatedReadme && (
                             <Button size="icon" variant="ghost" className="absolute top-4 right-4 h-8 w-8" onClick={handleCopyToClipboard}>
                                {isCopied ? <Check className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                                <span className="sr-only">Copy to clipboard</span>
                            </Button>
                        )}
                        {isLoading && (
                            <div className="flex items-center justify-center h-64">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        )}
                        {generatedReadme && (
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap font-mono text-sm h-[400px]">
                                <code>{generatedReadme}</code>
                            </pre>
                        )}
                        {!isLoading && !generatedReadme && (
                            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md text-center text-muted-foreground">
                                <p>Your generated README will appear here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
