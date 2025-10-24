'use server';
/**
 * @fileOverview A Genkit flow for generating a motivational quote.
 *
 * - generateQuote - A function that returns a motivational quote for developers.
 * - QuoteOutput - The return type for the generateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const QuoteOutputSchema = z.object({
  quote: z.string().describe('The generated motivational quote.'),
});
export type QuoteOutput = z.infer<typeof QuoteOutputSchema>;

export async function generateQuote(): Promise<QuoteOutput> {
  const quoteFlow = ai.defineFlow(
    {
      name: 'quoteFlow',
      outputSchema: QuoteOutputSchema,
    },
    async () => {
      const prompt = `Generate a short, inspiring motivational quote for a software developer.`;

      try {
        const { text } = await ai.generate({
          prompt: prompt,
        });
        return { quote: text };
      } catch (error: any) {
        console.warn("AI quote generation failed, using fallback.", error.message);
        // Fallback quote in case the AI service is unavailable
        return { quote: "The best way to predict the future is to invent it." };
      }
    }
  );
  return await quoteFlow();
}
