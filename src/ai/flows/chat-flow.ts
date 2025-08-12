
'use server';
/**
 * @fileOverview A chatbot AI flow.
 * 
 * - chat - A function that handles the chatbot conversation.
 */

import { ai } from '@/ai/genkit';
import { ChatInputSchema, ChatOutputSchema, type ChatInput, type ChatOutput } from './chat-schemas';

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { history, message } = input;

    const chatHistory = history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    }));

    const response = await ai.generate({
      prompt: message,
      history: chatHistory,
    });

    return { response: response.text };
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
