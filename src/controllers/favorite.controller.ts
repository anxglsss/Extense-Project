import { Request, Response } from 'express'
import { favoriteService } from '../services/favorite.service'

class FavoriteController {
	async favoritePost(req: Request, res: Response) {
		const userId = (req as UserRequest).user.id
		const postId = Number(req.params.postId)
		try {
			const favorite = await favoriteService.favoritePost({ userId, postId })
			res.status(201).json(favorite)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async removeFromFavorite(req: Request, res: Response) {
		const userId = (req as UserRequest).user.id
		const postId = Number(req.params.postId)
		try {
			await favoriteService.removeFromFavorite({ userId, postId })
			res.status(200).json({ message: 'Post Unliked' })
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getFavoritesByPost(req: Request, res: Response) {
		const postId = Number(req.params.postId)
		try {
			const favorites = await favoriteService.getFavoritesByPost(Number(postId))
			res.status(200).json(favorites)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getFavoritesByUser(req: Request, res: Response) {
		const userId = (req as UserRequest).user.id

		try {
			const favorites = await favoriteService.getFavoritesByUser(Number(userId))
			res.status(200).json(favorites)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export const favoriteController = new FavoriteController()

interface UserRequest extends Request {
	user: any
}
