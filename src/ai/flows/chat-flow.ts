
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {ChatMessage, ChatHistorySchema} from './chat-schemas';

const ChatInputSchema = z.object({
  history: ChatHistorySchema,
  message: z.string(),
});

const ChatOutputSchema = z.object({
  response: z.string(),
});

export async function chat(input: z.infer<typeof ChatInputSchema>): Promise<z.infer<typeof ChatOutputSchema>> {
    return chatFlow(input);
}

function convertToGenkitMessages(history: ChatMessage[]) {
    return history.map(message => ({
        role: message.role,
        content: [{ text: message.content }],
    }));
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({history, message}) => {

    const genkitMessages = convertToGenkitMessages(history);

    const {output} = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: message,
        history: genkitMessages,
        config: {
            // Adjust temperature for more creative or factual responses
            temperature: 0.7,
        }
    });

    return {
      response: output!.text!,
    };
  }
);
