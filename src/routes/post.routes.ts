import { Router } from 'express'
import { postController } from '../controllers/post.controller'
import { CreatePostSchema, UpdatePostSchema } from '../dtos/post.dto'
import { authMiddleware } from '../middlewares/auth.middleware'
import { uploadToS3 } from '../middlewares/upload.middleware'
import { validationMiddleware } from '../middlewares/validation.middleware'

export const postRouter = Router()

postRouter.get('/all', postController.getAllPosts)
postRouter.get('/:id', postController.getPostById)
postRouter.post(
	'/create',
	authMiddleware as any,
	validationMiddleware(CreatePostSchema),
	uploadToS3('post-image-bucket', 'imageUrl'),
	postController.createPost
)
postRouter.put(
	'/:id',
	authMiddleware as any,
	validationMiddleware(UpdatePostSchema),
	postController.updatePost
)
postRouter.delete('/:id', authMiddleware as any, postController.deletePost)

postRouter.get('/sort/date/recent', postController.getPostsByDateRecent)
postRouter.get('/sort/date/oldest', postController.getPostsByDateOldest)
postRouter.get('/sort/likes', postController.getPostsByLikes)
postRouter.get('/sort/favorites', postController.getPostsByFavorites)
postRouter.get(
	'/filter/friends',
	authMiddleware as any,
	postController.getPostsByFriends
)
postRouter.get('/filter/containsImage', postController.getPostsByContainsImage)
postRouter.get(
	'/filter/notContainsImage',
	postController.getPostsByNotContainsImage
)
