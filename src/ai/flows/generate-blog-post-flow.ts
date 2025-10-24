
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BlogPostInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
});

const BlogPostOutputSchema = z.object({
  description: z.string().describe('A 2-3 sentence description of the blog post, written in a professional and engaging tone.'),
});

export type BlogPostInput = z.infer<typeof BlogPostInputSchema>;
export type BlogPostOutput = z.infer<typeof BlogPostOutputSchema>;

const blogPostPrompt = ai.definePrompt({
    name: 'blogPostPrompt',
    input: { schema: BlogPostInputSchema },
    output: { schema: BlogPostOutputSchema },
    prompt: `You are an expert copywriter. Your task is to write a compelling, short description for a blog post based on its title. The description should be 2-3 sentences long.

    Blog Post Title: {{{title}}}
    `,
});

export const generateBlogPostFlow = ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: BlogPostInputSchema,
    outputSchema: BlogPostOutputSchema,
  },
  async (input) => {
    const {output} = await blogPostPrompt(input);
    return output!;
  }
);

export async function generateBlogPost(input: BlogPostInput): Promise<BlogPostOutput> {
    return generateBlogPostFlow(input);
}
