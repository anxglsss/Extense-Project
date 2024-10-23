import { Router } from 'express'
import { postController } from '../controllers/post.controller'

export const postRouter = Router()

postRouter.get('/all', postController.getAllPosts)
postRouter.get('/:id', postController.getPostById)
postRouter.post('/create', postController.createPost)
postRouter.put('/:id', postController.updatePost)
postRouter.delete('/:id', postController.deletePost)
