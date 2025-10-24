/**
 * @fileoverview This file defines the Zod schemas and TypeScript types for the 
 * 'chat' AI flow. Separating schemas is essential for Next.js to avoid 
 * bundling server-only code with client components.
 *
 * - ChatMessageSchema: Zod schema for a single chat message.
 * - ChatMessage: TypeScript type for a single chat message.
 * - ChatInputSchema: Zod schema for the chat flow input.
 * - ChatInput: TypeScript type for the chat input.
 * - ChatOutputSchema: Zod schema for the chat flow output.
 * - ChatOutput: TypeScript type for the chat output.
 */

import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response to the user message.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
