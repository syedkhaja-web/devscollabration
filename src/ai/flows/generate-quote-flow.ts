
'use server';
/**
 * @fileOverview An AI flow to generate motivational quotes.
 *
 * - generateQuote - A function that handles quote generation.
 */

import { ai } from '@/ai/genkit';
import { GenerateQuoteOutputSchema, type GenerateQuoteOutput } from './quote-schemas';

export async function generateQuote(): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow();
}

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    outputSchema: GenerateQuoteOutputSchema,
  },
  async () => {
    const prompt = `Generate a short, inspiring motivational quote for a software developer.`;

    const { text } = await ai.generate({
      prompt: prompt,
    });

    return { quote: text };
  }
);
