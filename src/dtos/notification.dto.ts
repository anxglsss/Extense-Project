import { z } from 'zod'

const NotificationSchema = z.object({
	senderId: z.number().positive(),
	receiverId: z.number().positive(),
})

export type NotificationDto = z.infer<typeof NotificationSchema>
