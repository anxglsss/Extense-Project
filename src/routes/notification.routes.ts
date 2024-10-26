import { Router } from 'express'
import { notificationController } from '../controllers/notification.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const notificationRouter = Router()

notificationRouter.post(
	'/send/:receiverId',
	authMiddleware as any,
	notificationController.createNotification
)
