import { Request, Response } from 'express'
import { likeService } from '../services/like.service'

class LikeController {
	async likePost(req: Request, res: Response) {
		const { userId, postId }: LikeDto = req.body
		try {
			const like = await likeService.likePost(userId, postId)
			res.status(201).json(like)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async unlikePost(req: Request, res: Response) {
		const { userId, postId }: LikeDto = req.body
		try {
			await likeService.unlikePost(userId, postId)
			res.status(200).json({ message: 'Post Unliked' })
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getLikesByPost(req: Request, res: Response) {
		const { postId } = req.params
		try {
			const likes = await likeService.getLikesByPost(Number(postId))
			res.status(200).json(likes)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async getLikesByUser(req: Request, res: Response) {
		const { userId } = req.params
		try {
			const likes = await likeService.getLikesByUser(Number(userId))
			res.status(200).json(likes)
		} catch (error) {
			res.status(500).json(error)
		}
	}
}

export const likeController = new LikeController()
