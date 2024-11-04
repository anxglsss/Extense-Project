import { LikeDto } from '@/dtos/like.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class LikeService {
	async likePost(like: LikeDto) {
		const existingLike = await prisma.like.findFirst({
			where: {
				userId: like.userId,
				postId: like.postId,
			},
		})
		if (existingLike) {
			throw new Error('User has already liked this post')
		}
		return await prisma.like.create({
			data: {
				userId: like.userId,
				postId: like.postId,
			},
		})
	}

	async unlikePost(like: LikeDto) {
		return await prisma.like.deleteMany({
			where: {
				userId: like.userId,
				postId: like.postId,
			},
		})
	}

	async getLikesByPost(postId: number) {
		const likes = await prisma.like.findMany({
			where: {
				postId,
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
		return likes
	}

	async getLikesByUser(userId: number) {
		const likes = await prisma.like.findMany({
			where: {
				userId,
			},
			include: {
				post: {
					select: {
						id: true,
						title: true,
						imageUrl: true,
					},
				},
			},
		})
		return likes
	}
}

export const likeService = new LikeService()
