
/**
 * @fileOverview Schemas and types for quote generation.
 * 
 * - GenerateQuoteInput - The input type for the generateQuote function.
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import { z } from 'genkit';

export const GenerateQuoteInputSchema = z.object({});
export type GenerateQuoteInput = z.infer<typeof GenerateQuoteInputSchema>;

export const GenerateQuoteOutputSchema = z.object({
  quote: z.string().describe('The generated motivational quote.'),
});
export type GenerateQuoteOutput = z.infer<typeof GenerateQuoteOutputSchema>;
