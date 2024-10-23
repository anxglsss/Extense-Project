import { Request, Response } from 'express'
import { favoriteService } from '../services/favorite.service'

class FavoriteController {
	async favoritePost(req: Request, res: Response) {
		const postId = Number(req.params.postId)
		const userId = (req as UserRequest).user.id

		try {
			const favorite = await favoriteService.favoritePost(userId, postId)
			res.status(201).json(favorite)
		} catch (error) {
			res.status(500).json({ error: 'Error favoriting post' })
		}
	}

	async unfavoritePost(req: Request, res: Response) {
		const postId = Number(req.params.postId)
		const userId = (req as UserRequest).user.id

		try {
			await favoriteService.unfavoritePost(userId, postId)
			return res.status(200).json({ message: 'Post unfavorited successfully' })
		} catch (error) {
			return res.status(500).json({ error: 'Error unfavoriting post' })
		}
	}

	async getFavoritesByPost(req: Request, res: Response) {
		const postId = parseInt(req.params.postId)

		try {
			const favorites = await favoriteService.getFavoritesByPost(postId)
			return res.status(200).json(favorites)
		} catch (error) {
			return res.status(500).json({ error: 'Error fetching favorites' })
		}
	}

	async getFavoritesByUser(req: Request, res: Response) {
		const userId = parseInt(req.params.userId)

		try {
			const favorites = await favoriteService.getFavoritesByUser(userId)
			return res.status(200).json(favorites)
		} catch (error) {
			return res.status(500).json({ error: 'Error fetching favorites' })
		}
	}
}

export const favoriteController = new FavoriteController()

interface UserRequest extends Request {
	user: any
}
