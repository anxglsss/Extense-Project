import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class LikeService {
	async likePost(userId: number, postId: number) {
		return await prisma.like.create({
			data: {
				userId,
				postId,
			},
		})
	}

	async unlikePost(userId: number, postId: number) {
		return await prisma.like.deleteMany({
			where: {
				userId,
				postId,
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
