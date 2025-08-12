
'use server';
/**
 * @fileOverview An AI flow to generate blog post content.
 *
 * - generateBlogPost - A function that handles blog post generation.
 */

import { ai } from '@/ai/genkit';
import { GenerateBlogPostInputSchema, GenerateBlogPostOutputSchema, type GenerateBlogPostInput, type GenerateBlogPostOutput } from './blog-post-schemas';


export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  return generateBlogPostFlow(input);
}

const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {

    const prompt = `Write a short and engaging blog post description based on the following title: "${input.title}". The description should be a single paragraph.`;

    const { text } = await ai.generate({
      prompt: prompt,
    });

    return { description: text };
  }
);
