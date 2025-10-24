'use server';
/**
 * @fileOverview A Genkit flow for generating a blog post description from a title.
 *
 * - generateBlogPost - A function that takes a title and returns a description.
 * - BlogPostInput - The input type for the generateBlogPost function.
 * - BlogPostOutput - The return type for the generateBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const BlogPostInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
});
export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;

export const BlogPostOutputSchema = z.object({
  description: z.string().describe('The generated blog post description.'),
});
export type BlogPostOutput = z.infer<typeof BlogPostOutputSchema>;

export async function generateBlogPost(
  input: BlogPostInput
): Promise<BlogPostOutput> {
  const blogPostFlow = ai.defineFlow(
    {
      name: 'blogPostFlow',
      inputSchema: BlogPostInputSchema,
      outputSchema: BlogPostOutputSchema,
    },
    async ({title}) => {
      const prompt = `Generate a short, engaging, and SEO-friendly description for a blog post with the following title: "${title}". The description should be about 2-3 sentences long.`;

      const {text} = await ai.generate({
        prompt: prompt,
      });

      return {description: text};
    }
  );
  return await blogPostFlow(input);
}
