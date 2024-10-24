import { Request, Response } from 'express'
import { likeService } from '../services/like.service'

class LikeController {
	async likePost(req: Request, res: Response) {
		const postId = Number(req.params.postId)
		const userId = (req as UserRequest).user.id

		try {
			const like = await likeService.likePost({ userId, postId })

			res.status(201).json(like)
		} catch (error) {
			res.status(500).json({ error: 'Error liking post' })
		}
	}

	async unlikePost(req: Request, res: Response) {
		const postId = Number(req.params.postId)
		const userId = (req as UserRequest).user.id

		try {
			await likeService.unlikePost({ userId, postId })

			res.status(200).json({ message: 'Post unliked successfully' })
		} catch (error) {
			res.status(500).json({ error: 'Error unliking post' })
		}
	}

	async getLikesByPost(req: Request, res: Response) {
		const postId = Number(req.params.postId)

		try {
			const likes = await likeService.getLikesByPost(postId)

			res.status(200).json(likes)
		} catch (error) {
			res.status(500).json({ error: 'Error fetching likes' })
		}
	}

	async getLikesByUser(req: Request, res: Response) {
		const userId = (req as UserRequest).user.id

		try {
			const likes = await likeService.getLikesByUser(userId)

			res.status(200).json(likes)
		} catch (error) {
			res.status(500).json({ error: 'Error fetching likes' })
		}
	}
}

export const likeController = new LikeController()

interface UserRequest extends Request {
	user: any
}
