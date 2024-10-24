import { z } from 'zod'

export const FriendRequestSchema = z.object({
	senderId: z.number().positive(),
	receiverId: z.number().positive(),
})

export type FriendRequestDto = z.infer<typeof FriendRequestSchema>
