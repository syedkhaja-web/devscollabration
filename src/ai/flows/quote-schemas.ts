
/**
 * @fileOverview Schemas and types for quote generation.
 * 
 * - GenerateQuoteOutput - The return type for the generateQuote function.
 */

import { z } from 'genkit';

export const GenerateQuoteOutputSchema = z.object({
  quote: z.string().describe('The generated motivational quote.'),
});
export type GenerateQuoteOutput = z.infern<typeof GenerateQuoteOutputSchema>;
