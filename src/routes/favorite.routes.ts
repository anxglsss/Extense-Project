import { Router } from 'express'
import { favoriteController } from '../controllers/favorite.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const favoriteRouter = Router()

favoriteRouter.post(
	'/post/:postId',
	authMiddleware as any,
	favoriteController.favoritePost
)

favoriteRouter.delete(
	'/post/:postId',
	authMiddleware as any,
	favoriteController.removeFromFavorite
)

favoriteRouter.get('/post/:postId', favoriteController.getFavoritesByPost)

favoriteRouter.get('/user/:userId', favoriteController.getFavoritesByUser)
