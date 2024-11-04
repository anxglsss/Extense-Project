import { commentController } from '@/controllers/comment.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { Router } from 'express'

export const commentRouter = Router()

commentRouter.get('/:postId', commentController.getCommentsByPostId)
commentRouter.post(
	'/create/:postId',
	authMiddleware as any,
	commentController.createComment
)
commentRouter.put(
	'/:id',
	authMiddleware as any,
	commentController.updateComment
)
commentRouter.delete(
	'/:id',
	authMiddleware as any,
	commentController.deleteComment
)
