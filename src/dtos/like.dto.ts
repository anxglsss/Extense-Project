import { z } from 'zod'

export const LikeSchema = z.object({
	userId: z.number().positive(),
	postId: z.number().positive(),
})

export type LikeDto = z.infer<typeof LikeSchema>
