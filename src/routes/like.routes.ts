import { Router } from 'express'
import { likeController } from '../controllers/like.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const likeRouter = Router()

likeRouter.post('/post/:postId', authMiddleware as any, likeController.likePost)
likeRouter.delete(
	'/post/:postId',
	authMiddleware as any,
	likeController.likePost
)
likeRouter.get('/post/:postId', authMiddleware as any, likeController.likePost)
likeRouter.get('/user/:userId', authMiddleware as any, likeController.likePost)
