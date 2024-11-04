import { notificationController } from '@/controllers/notification.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

export const notificationRouter = Router()

notificationRouter.post(
	'/send/:receiverId',
	authMiddleware as any,
	notificationController.createNotification
)
