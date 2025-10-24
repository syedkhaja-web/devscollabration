'use server';
/**
 * @fileOverview A flow for generating blog post descriptions from a title.
 *
 * - generateBlogPost - A function that creates a blog post description.
 */

import { ai } from '@/ai/genkit';
import {
  BlogPostInputSchema,
  BlogPostOutputSchema,
  type BlogPostInput,
  type BlogPostOutput,
} from '@/ai/flows/generate-blog-post-schemas';

const blogPostPrompt = ai.definePrompt({
  name: 'blogPostPrompt',
  input: { schema: BlogPostInputSchema },
  output: { schema: BlogPostOutputSchema },
  prompt: `Generate a short, engaging blog post description based on the following title: {{{title}}}`,
});

export async function generateBlogPost(
  input: BlogPostInput
): Promise<BlogPostOutput> {
  try {
    const { output } = await blogPostPrompt(input);
    return output!;
  } catch (error) {
    console.error('AI Blog Post generation failed:', error);
    // Return a fallback description if the AI service fails.
    return {
      description:
        'An error occurred while generating the description. Please write one manually or try again later.',
    };
  }
}
