import { Router } from 'express'
import { postController } from '../controllers/post.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const postRouter = Router()

postRouter.get('/all', postController.getAllPosts)
postRouter.get('/:id', postController.getPostById)
postRouter.post('/create', authMiddleware as any, postController.createPost)
postRouter.put('/:id', authMiddleware as any, postController.updatePost)
postRouter.delete('/:id', authMiddleware as any, postController.deletePost)
