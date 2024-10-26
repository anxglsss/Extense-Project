import { Request, Response } from 'express'
import { notificationService } from '../services/notification.service'

class NotificationController {
	async createNotification(req: Request, res: Response) {
		try {
			const senderId = (req as UserRequest).user.id
			const receiverId = Number(req.params.receiverId)
			const notification = await notificationService.createNotification({
				senderId,
				receiverId,
			})
			res.status(201).json(notification)
		} catch (error) {
			res.status(404).json(error)
		}
	}
}
interface UserRequest extends Request {
	user: any
}
export const notificationController = new NotificationController()
