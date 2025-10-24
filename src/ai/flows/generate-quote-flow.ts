
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuoteOutputSchema = z.object({
  quote: z.string().describe('An inspiring and insightful quote about software development, collaboration, or technology.'),
});

export type QuoteOutput = z.infer<typeof QuoteOutputSchema>;

const quotePrompt = ai.definePrompt({
    name: 'quotePrompt',
    output: { schema: QuoteOutputSchema },
    prompt: `You are a source of inspiration for software developers. Provide one motivational quote about programming, teamwork, or innovation.`,
});

export const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    outputSchema: QuoteOutputSchema,
  },
  async () => {
    const {output} = await quotePrompt();
    return output!;
  }
);

export async function generateQuote(): Promise<QuoteOutput> {
    return generateQuoteFlow();
}
