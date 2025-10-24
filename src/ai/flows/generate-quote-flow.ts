
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateQuoteOutputSchema = z.object({
  quote: z.string(),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;

export async function generateQuote(): Promise<GenerateQuoteOutput> {
  return generateQuoteFlow();
}

const generateQuoteFlow = ai.defineFlow(
  {
    name: 'generateQuoteFlow',
    outputSchema: GenerateQuoteOutputSchema,
  },
  async () => {
    try {
      const prompt = `Generate a short, inspiring motivational quote for a software developer.`;

      const { text } = await ai.generate({
        prompt: prompt,
      });

      return { quote: text };
    } catch (error: any) {
      // If the model is overloaded or another error occurs, return a fallback quote.
      console.error(`Error generating quote: ${error.message}`);
      return { quote: "The best way to predict the future is to invent it." };
    }
  }
);
