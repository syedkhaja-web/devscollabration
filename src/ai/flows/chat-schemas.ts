
import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

export const ChatHistorySchema = z.array(ChatMessageSchema);

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
