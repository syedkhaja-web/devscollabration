/**
 * @fileOverview Schemas and types for the chat flow.
 * 
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 * - ChatMessage - A single message in the chat history.
 */

import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe("The user's message."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
