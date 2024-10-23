import { Router } from 'express'
import { commentController } from '../controllers/comment.controller'

export const commentRouter = Router()

commentRouter.get('/:postId', commentController.getCommentsByPostId)
commentRouter.post('/create/:postId', commentController.createComment)
commentRouter.put('/:id', commentController.updateComment)
commentRouter.delete('/:id', commentController.deleteComment)
