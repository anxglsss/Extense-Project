import { Request, Response } from 'express'
import { FavoriteDto } from '../dtos/favorite.dto'
import { favoriteService } from '../services/favorite.service'

class FavoriteController {
	async favoritePost(req: Request, res: Response) {
		const { userId, postId }: FavoriteDto = req.body
		try {
			const favorite = await favoriteService.favoritePost(userId, postId)
			res.status(201).json(favorite)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async removeFromFavorite(req: Request, res: Response) {
		const { userId, postId }: FavoriteDto = req.body
		try {
			await favoriteService.removeFromFavorite(userId, postId)
			res.status(200).json({ message: 'Post Unliked' })
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getFavoritesByPost(req: Request, res: Response) {
		const { postId } = req.params
		try {
			const favorites = await favoriteService.getFavoritesByPost(Number(postId))
			res.status(200).json(favorites)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getFavoritesByUser(req: Request, res: Response) {
		const { userId } = req.params
		try {
			const favorites = await favoriteService.getFavoritesByUser(Number(userId))
			res.status(200).json(favorites)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export const likeController = new FavoriteController()
