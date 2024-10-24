import { z } from 'zod'

export const CreateCommentSchema = z.object({
	content: z.string().min(3, 'Content must be at least 3 characters.'),
})

export const UpdateCommentSchema = CreateCommentSchema.partial()

export type CreateCommentDto = z.infer<typeof CreateCommentSchema>
export type UpdateCommentDto = z.infer<typeof UpdateCommentSchema>
