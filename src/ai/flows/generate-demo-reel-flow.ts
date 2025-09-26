'use server';
/**
 * @fileOverview A flow to generate a multi-clip demo reel for Devs Tec.
 * 
 * - generateDemoReel - A function that creates a series of video clips.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import * as fs from 'fs';
import { Readable } from 'stream';

const DemoReelOutputSchema = z.object({
  videoUrls: z.array(z.string()).describe('An array of data URIs for the generated video clips.'),
});

type DemoReelOutput = z.infer<typeof DemoReelOutputSchema>;

// Helper to download video from the temporary URL provided by the API
async function downloadVideo(videoUrl: string): Promise<string> {
    const fetch = (await import('node-fetch')).default;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set.');
    }

    const videoDownloadResponse = await fetch(`${videoUrl}&key=${apiKey}`);
    if (!videoDownloadResponse.ok || !videoDownloadResponse.body) {
        throw new Error(`Failed to download video: ${videoDownloadResponse.statusText}`);
    }

    const buffer = await videoDownloadResponse.buffer();
    return `data:video/mp4;base64,${buffer.toString('base64')}`;
}


const generateDemoReelFlow = ai.defineFlow(
  {
    name: 'generateDemoReelFlow',
    inputSchema: z.object({}),
    outputSchema: DemoReelOutputSchema,
  },
  async () => {
    const prompts = [
      // 1. Problem (5-10 seconds)
      "A developer looking stressed, surrounded by complex code on multiple screens in a dark room. The mood is frustrating. Close up on tangled cables and messy desk. Cinematic, dramatic lighting.",
      
      // 2. Solution Intro (transition)
      "A smooth, animated transition from the chaotic desk to a clean, elegant, and dark-themed UI. A single line of code is typed effortlessly. The Devs Tec logo animates subtly in the corner. Minimalist and sleek.",
      
      // 3. Solution - Collaboration
      "Split-screen animation showing multiple developer avatars collaborating in real-time on the same code file within the Devs Tec UI. Cursors with names move smoothly across the screen. Confident and efficient tone.",
      
      // 4. Solution - Ease of Use
      "A seamless UI/UX animation showing a developer dragging and dropping components to build an interface. The process is fast, fluid, and intuitive. Show a CI/CD pipeline visualizing a successful deployment with green checkmarks. Reassuring and satisfying.",

      // 5. Solution - Results
      "A beautiful, finished application dashboard with dynamic charts and graphs is revealed. The camera slowly zooms out, showing the app on a laptop screen. The overall feeling is accomplishment and success. Polished and professional."
    ];

    const videoUrls: string[] = [];

    for (const prompt of prompts) {
      let { operation } = await ai.generate({
        model: googleAI.model('veo-3.0-generate-preview'),
        prompt: prompt,
        config: {
          aspectRatio: '16:9',
        },
      });

      if (!operation) {
        throw new Error('Expected the model to return an operation');
      }

      // Poll for completion
      while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
      }

      if (operation.error) {
        // Check for specific billing error message
        if (operation.error.message.includes("billing enabled")) {
          throw new Error("This feature requires a Google Cloud project with billing enabled. Please enable billing in your GCP project settings to use this model.");
        }
        throw new Error(`Failed to generate video: ${operation.error.message}`);
      }

      const video = operation.output?.message?.content.find((p) => !!p.media);
      if (!video || !video.media?.url) {
        throw new Error('Failed to find the generated video in the operation result');
      }

      // Download the video from the temporary URL and convert it to a data URI
      const dataUri = await downloadVideo(video.media.url);
      videoUrls.push(dataUri);
    }

    return { videoUrls };
  }
);


export async function generateDemoReel(): Promise<DemoReelOutput> {
    return generateDemoReelFlow({});
}
