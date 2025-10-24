'use server';
/**
 * @fileOverview A simple chat flow that uses the gemini-pro model.
 *
 * This file contains the implementation of a Genkit flow for a basic chat functionality.
 * It takes a history of messages and a new message as input, and returns the model's response.
 */

import { ai } from '@/ai/genkit';
import { ChatHistorySchema, ChatMessageSchema } from './chat-schemas';

/**
 * Executes the chat flow.
 * @param {object} input - The input for the chat flow.
 * @param {Array<object>} input.history - The history of messages.
 * @param {string} input.message - The new message.
 * @returns {Promise<object>} The result of the chat flow.
 */
export async function chat(input: {
  history: Array<{ role: 'user' | 'model'; content: string }>;
  message: string;
}): Promise<{ response: string }> {
  const { history, message } = input;

  const response = await ai.generate({
    prompt: {
      messages: [
        ...history.map((msg) => ({
          role: msg.role,
          content: [{ text: msg.content }],
        })),
        { role: 'user', content: [{ text: message }] },
      ],
    },
    history: history.map((msg) => ({
      role: msg.role,
      content: [{ text: msg.content }],
    })),
  });

  return { response: response.text };
}
