import { PrismaClient } from '@prisma/client'
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto'

const prisma = new PrismaClient()

class CommentService {
	async getCommentsByPostId(postId: number) {
		return await prisma.comment.findMany({
			where: { postId: postId },
			include: { user: { select: { id: true, name: true, avatarUrl: true } } },
		})
	}

	async createComment(
		comment: CreateCommentDto,
		userId: number,
		postId: number
	) {
		return await prisma.comment.create({ data: { ...comment, userId, postId } })
	}

	async updateComment(id: number, comment: UpdateCommentDto) {
		return await prisma.comment.update({ where: { id }, data: { ...comment } })
	}

	async deleteComment(id: number) {
		return await prisma.comment.delete({ where: { id } })
	}
}

export const commentService = new CommentService()
