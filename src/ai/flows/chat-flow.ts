
'use server';
/**
 * @fileOverview A conversational AI chat flow.
 *
 * - chat - A function that handles a single turn in a conversation.
 */

import { ai } from '@/ai/genkit';
import {
  ChatInputSchema,
  ChatOutputSchema,
  type ChatInput,
} from '@/ai/flows/chat-schemas';


const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  system: `You are a helpful AI assistant named Devs Tec. You are an expert in software development, Next.js, Firebase, and the Genkit AI framework. 
  Your goal is to assist users with their questions about the Devs Tec platform and provide helpful, accurate information.
  Keep your responses concise and to the point.`,
  prompt: `Here is the conversation history:
{{#each history}}
{{#if (eq role 'user')}}
User: {{{content}}}
{{else}}
AI: {{{content}}}
{{/if}}
{{/each}}

New user message: {{{message}}}
`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output!;
  }
);

export async function chat(input: ChatInput) {
  const result = await chatFlow(input);
  return { response: result.response };
}
