import { z } from 'zod'

export const FavoriteSchema = z.object({
	userId: z.number().positive(),
	postId: z.number().positive(),
})

export type FavoriteDto = z.infer<typeof FavoriteSchema>
