import { Router } from 'express'
import { commentController } from '../controllers/comment.controller'
import { CreateCommentSchema, UpdateCommentSchema } from '../dtos/comment.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'

export const commentRouter = Router()

commentRouter.get('/post/:postId', commentController.getCommentsByPostId)
commentRouter.post(
	'/create',
	authMiddleware as any,
	validationMiddleware(CreateCommentSchema),
	commentController.createComment
)
commentRouter.put(
	'/:id',
	authMiddleware as any,
	validationMiddleware(UpdateCommentSchema),
	commentController.updateComment
)
commentRouter.delete(
	'/:id',
	authMiddleware as any,
	commentController.deleteComment
)
