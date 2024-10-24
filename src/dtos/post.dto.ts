import { z } from 'zod'

export const CreatePostSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters.'),
	content: z.string().min(8, 'Content must be at least 8 characters'),
	imageUrl: z.string().url('Invalid URL').optional(),
})

export const UpdatePostSchema = CreatePostSchema.partial()

export type CreatePostDto = z.infer<typeof CreatePostSchema>
export type UpdatePostDto = z.infer<typeof UpdatePostSchema>
