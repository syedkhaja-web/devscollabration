'use client';

import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateDemoReel } from '@/ai/flows/generate-demo-reel-flow';

export default function ReelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoClips, setVideoClips] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerateReel = async () => {
    setIsLoading(true);
    setVideoClips([]);
    try {
      const result = await generateDemoReel();
      setVideoClips(result.videoUrls);
      toast({
        title: 'Demo Reel Generated!',
        description: 'Your video clips are ready below.',
      });
    } catch (error) {
      console.error('Failed to generate demo reel:', error);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate the demo reel. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="mx-auto h-16 w-16 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight mt-4">Generate Demo Reel</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create a 45-second demo reel for Devs Tec. The video will follow a problem-solution narrative, showcasing the platform's elegant UI/UX.
            </p>
            <div className="mt-8">
              <Button size="lg" onClick={handleGenerateReel} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Video className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'Generating Clips...' : 'Generate Demo Reel'}
              </Button>
              {isLoading && (
                 <p className="text-sm text-muted-foreground mt-4">
                    Please be patient, video generation can take several minutes.
                </p>
              )}
            </div>
          </div>

          {videoClips.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">Generated Clips</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {videoClips.map((clip, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Clip {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <video controls src={clip} className="w-full rounded-md" />
                    </CardContent>
                  </Card>
                ))}
              </div>
               <div className="text-center mt-8 text-muted-foreground">
                <p>You can now download these clips and edit them together to create your final demo reel.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
