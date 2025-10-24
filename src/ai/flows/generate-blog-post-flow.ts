
'use server';

import { ai } from '@/ai/genkit';
import { GenerateBlogPostInputSchema, GenerateBlogPostOutputSchema } from './generate-blog-post-schemas';
import type { GenerateBlogPostInput, GenerateBlogPostOutput } from './generate-blog-post-schemas';

export async function generateBlogPost(input: GenerateBlogPostInput): Promise<GenerateBlogPostOutput> {
  const blogPostPrompt = ai.definePrompt(
    {
      name: 'blogPostPrompt',
      input: { schema: GenerateBlogPostInputSchema },
      output: { schema: GenerateBlogPostOutputSchema },
      prompt: `Generate a short, engaging blog post description based on the provided title. The description should be a single paragraph.

      Title: {{{title}}}
      `,
    },
  );

  const { output } = await blogPostPrompt(input);
  return output!;
}
