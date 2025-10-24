
'use server';

import { ai } from '@/ai/genkit';
import {
  GenerateQuoteOutputSchema,
  type GenerateQuoteOutput,
} from '@/ai/flows/generate-quote-schemas';

const quotePrompt = ai.definePrompt({
  name: 'quotePrompt',
  output: { schema: GenerateQuoteOutputSchema },
  prompt: 'Generate a short, inspirational quote for a developer.',
});

const quoteFlow = ai.defineFlow(
  {
    name: 'quoteFlow',
    outputSchema: GenerateQuoteOutputSchema,
  },
  async () => {
    const { output } = await quotePrompt();
    return output!;
  }
);

export async function generateQuote(): Promise<GenerateQuoteOutput> {
  return await quoteFlow();
}
