import { PrismaClient } from '@prisma/client'
import { NotificationDto } from '../dtos/notification.dto'

const prisma = new PrismaClient()

class NotificationService {
	async createNotification(notification: NotificationDto) {
		return await prisma.notification.create({
			data: {
				senderId: notification.senderId,
				receiverId: notification.receiverId,
			},
		})
	}
}

export const notificationService = new NotificationService()
