'use server';
/**
 * @fileOverview A flow that generates a blog post description from a title.
 *
 * - generateBlogPost - A function that handles the blog post generation process.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateBlogPostInputSchema,
  GenerateBlogPostOutputSchema,
  type GenerateBlogPostInput,
  type GenerateBlogPostOutput,
} from '@/ai/flows/generate-blog-post-schemas';

const blogPostPrompt = ai.definePrompt({
  name: 'blogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `Generate a short, engaging, and SEO-friendly blog post description based on the following title: {{{title}}}`,
});

export async function generateBlogPost(
  input: GenerateBlogPostInput
): Promise<GenerateBlogPostOutput> {
  try {
    const { output } = await blogPostPrompt(input);
    return output!;
  } catch (error) {
    console.error('Error generating blog post:', error);
    // Return a fallback description in case of an error
    return {
      description:
        'AI description generation is currently unavailable. Please write a description manually.',
    };
  }
}
