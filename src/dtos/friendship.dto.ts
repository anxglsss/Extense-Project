import { z } from 'zod'

export const FriendshipSchema = z.object({
	user1Id: z.number().positive(),
	user2Id: z.number().positive(),
})

export type FriendshipDto = z.infer<typeof FriendshipSchema>
