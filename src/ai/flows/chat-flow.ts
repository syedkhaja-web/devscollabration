'use server';
/**
 * @fileOverview A simple chat flow that uses Gemini to generate responses.
 *
 * - chat - A function that takes a message history and a new message, and returns the AI's response.
 */
import {ai} from '@/ai/genkit';
import {ChatHistorySchema, ChatMessageSchema} from './chat-schemas';
import {z} from 'zod';

const ChatInputSchema = z.object({
  history: ChatHistorySchema,
  message: z.string(),
});

const ChatOutputSchema = z.object({
  response: z.string(),
});

export async function chat(input: {
  history: z.infer<typeof ChatHistorySchema>;
  message: string;
}): Promise<z.infer<typeof ChatOutputSchema>> {
  // Construct a system prompt to guide the AI.
  const systemPrompt = `You are a helpful AI assistant for a software development platform called Devs Tec.
Your role is to assist users with questions about the platform, help them with coding problems,
and provide information about software development best practices.

Keep your responses concise and helpful.`;

  // Prepend the system prompt to the chat history.
  const historyWithSystemPrompt: z.infer<typeof ChatMessageSchema>[] = [
    {role: 'system', content: systemPrompt},
    ...input.history,
  ];

  const {text} = await ai.generate({
    prompt: [
      ...historyWithSystemPrompt.map(msg => ({
        role: msg.role,
        content: [{text: msg.content}],
      })),
      {role: 'user', content: [{text: input.message}]},
    ],
  });

  return {response: text};
}
