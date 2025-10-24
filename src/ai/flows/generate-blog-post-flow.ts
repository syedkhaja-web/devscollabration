
'use server';
/**
 * @fileOverview A flow that generates a blog post description from a title.
 *
 * - generateBlogPost - A function that generates a blog post description.
 */

import { ai } from '@/ai/genkit';
import {
  GenerateBlogPostInputSchema,
  GenerateBlogPostOutputSchema,
  type GenerateBlogPostInput,
} from '@/ai/flows/generate-blog-post-schemas';


const blogPostPrompt = ai.definePrompt({
  name: 'blogPostPrompt',
  input: { schema: GenerateBlogPostInputSchema },
  output: { schema: GenerateBlogPostOutputSchema },
  prompt: `You are an expert in writing compelling blog post descriptions. 
  Given the following title, write a short, engaging description for a blog post. 
  The description should be optimized for search engines and entice users to read the full article.
  
  Title: {{{title}}}
  
  Generate a description that is between 100 and 150 characters.`,
});

const blogPostFlow = ai.defineFlow(
  {
    name: 'blogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async (input) => {
    const { output } = await blogPostPrompt(input);
    return output!;
  }
);

export async function generateBlogPost(input: GenerateBlogPostInput) {
  return await blogPostFlow(input);
}
