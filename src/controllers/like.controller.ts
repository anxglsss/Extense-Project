import { Request, Response } from 'express'
import { LikeDto } from '../dtos/like.dto'
import { likeService } from '../services/like.service'

class LikeController {
	async likePost(req: Request, res: Response) {
		const { postId, userId }: LikeDto = req.body

		try {
			const like = await likeService.likePost(userId, postId)
			return res.status(201).json(like)
		} catch (error) {
			return res.status(500).json({ error: 'Error liking post' })
		}
	}

	async unlikePost(req: Request, res: Response) {
		const { postId, userId }: LikeDto = req.body

		try {
			await likeService.unlikePost(userId, postId)
			return res.status(200).json({ message: 'Post unliked successfully' })
		} catch (error) {
			return res.status(500).json({ error: 'Error unliking post' })
		}
	}

	async getLikesByPost(req: Request, res: Response) {
		const postId = parseInt(req.params.postId)

		try {
			const likes = await likeService.getLikesByPost(postId)
			return res.status(200).json(likes)
		} catch (error) {
			return res.status(500).json({ error: 'Error fetching likes' })
		}
	}

	async getLikesByUser(req: Request, res: Response) {
		const userId = parseInt(req.params.userId)

		try {
			const likes = await likeService.getLikesByUser(userId)
			return res.status(200).json(likes)
		} catch (error) {
			return res.status(500).json({ error: 'Error fetching likes' })
		}
	}
}

export const likeController = new LikeController()
