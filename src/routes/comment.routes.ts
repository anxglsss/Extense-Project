import { Router } from 'express'
import { commentController } from '../controllers/comment.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const commentRouter = Router()

commentRouter.get('/:postId', commentController.getCommentsByPost)
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
