import { friendRequestController } from '@/controllers/friend-request.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

export const friendRequestRouter = Router()

friendRequestRouter.post(
	'/send/:receiverId',
	authMiddleware as any,
	friendRequestController.sendRequest
)
friendRequestRouter.put(
	'/response/:requestId',
	authMiddleware as any,
	friendRequestController.responseToRequest
)
friendRequestRouter.get(
	'/pending/all',
	authMiddleware as any,
	friendRequestController.getPendingRequests
)
friendRequestRouter.get(
	'/accepted/all',
	authMiddleware as any,
	friendRequestController.getAcceptedRequests
)
friendRequestRouter.get(
	'/send/all',
	authMiddleware as any,
	friendRequestController.getSendRequests
)
friendRequestRouter.delete(
	'/:requestId',
	authMiddleware as any,
	friendRequestController.deleteRequest
)
