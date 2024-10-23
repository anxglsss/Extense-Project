import { Request, Response } from 'express'
import { commentService } from '../services/comment.service'

class CommentController {
	async getCommentsByPostId(req: Request, res: Response) {
		try {
			const comments = await commentService.getCommentsByPostId(
				Number(req.params.postId)
			)
			res.status(200).json(comments)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async createComment(req: Request, res: Response) {
		try {
			const comment = await commentService.createComment(
				req.body,
				(req as UserRequest).user.id,
				Number(req.params.postId)
			)
			res.status(201).json(comment)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async updateComment(req: Request, res: Response) {
		try {
			const updatedComment = await commentService.updateComment(
				Number(req.params.id),
				req.body
			)
			res.status(200).json(updatedComment)
		} catch (error) {
			res.status(500).json(error)
		}
	}
	async deleteComment(req: Request, res: Response) {
		try {
			await commentService.deleteComment(Number(req.params.id))
			res.status(200).json({ message: 'Comment deleted' })
		} catch (error) {
			res.status(500).json(error)
		}
	}
}
export const commentController = new CommentController()

interface UserRequest extends Request {
	user: any
}
