'use server';
/**
 * @fileOverview A blog post generation AI flow.
 *
 * This file contains the implementation of a Genkit flow that generates a blog post
 * description based on a given title.
 */
import { ai } from '@/ai/genkit';
import { BlogPostInputSchema, BlogPostOutputSchema } from './generate-blog-post-schemas';
import type { BlogPostInput } from './generate-blog-post-schemas';

/**
 * Generates a blog post description based on a title.
 * @param {object} input - The input for the blog post generation.
 * @param {string} input.title - The title of the blog post.
 * @returns {Promise<{ description: string }>} An object containing the generated description.
 */
export async function generateBlogPost(input: BlogPostInput): Promise<{ description: string }> {
  const blogPostFlow = ai.defineFlow(
    {
      name: 'blogPostFlow',
      inputSchema: BlogPostInputSchema,
      outputSchema: BlogPostOutputSchema,
    },
    async (input) => {
      const prompt = `Generate a short, engaging blog post description for the title: "${input.title}". The description should be two sentences long.`;
      
      const { text } = await ai.generate({
        prompt: prompt,
        // Optional: Add other generation config like temperature, etc.
      });
      
      return { description: text };
    }
  );

  return await blogPostFlow(input);
}
