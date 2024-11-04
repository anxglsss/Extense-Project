import { CreateCommentDto, UpdateCommentDto } from '@/dtos/comment.dto'
import { commentService } from '@/services/comment.service'
import { Request, Response } from 'express'

class CommentController {
	async getCommentsByPostId(req: Request, res: Response) {
		try {
			const comments = await commentService.getCommentsByPostId(
				Number(req.params.postId)
			)
			res.status(200).json(comments)
		} catch (error) {
			res.status(500).json({ error: 'Error fetching comments' })
		}
	}

	async createComment(req: Request, res: Response) {
		const userId = (req as UserRequest).user.id
		const postId = Number(req.params.postId)
		const commentData: CreateCommentDto = req.body

		try {
			const newComment = await commentService.createComment(
				commentData,
				userId,
				postId
			)
			res.status(201).json(newComment)
		} catch (error) {
			res.status(500).json({ error: 'Error creating comment' })
		}
	}

	async updateComment(req: Request, res: Response) {
		const commentId = Number(req.params.id)
		const updatedData: UpdateCommentDto = req.body

		try {
			const updatedComment = await commentService.updateComment(
				commentId,
				updatedData
			)
			res.status(200).json(updatedComment)
		} catch (error) {
			res.status(500).json({ error: 'Error updating comment' })
		}
	}

	async deleteComment(req: Request, res: Response) {
		const commentId = Number(req.params.id)
		try {
			await commentService.deleteComment(commentId)
			res.status(204).json({ message: 'Comment deleted successfully' })
		} catch (error) {
			res.status(500).json({ error: 'Error deleting comment' })
		}
	}
}

export const commentController = new CommentController()

interface UserRequest extends Request {
	user: any
}
