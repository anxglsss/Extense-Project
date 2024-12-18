import { friendshipController } from '@/controllers/friendship.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

export const friendshipRouter = Router()

friendshipRouter.get(
	'/all',
	authMiddleware as any,
	friendshipController.getFriends
)
friendshipRouter.delete(
	'/:friendshipId',
	authMiddleware as any,
	friendshipController.deleteFriendship
)
