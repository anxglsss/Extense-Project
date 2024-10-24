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
		await prisma.like.deleteMany({
			where: {
				userId,
				postId,
			},
		})
	}

	async getLikesByPost(postId: number) {
		return await prisma.like.findMany({
			where: {
				postId,
			},
			include: {
				user: { select: { id: true, name: true, avatarUrl: true } },
			},
		})
	}

	async getLikesByUser(userId: number) {
		return await prisma.like.findMany({
			where: {
				userId,
			},
			include: {
				post: { select: { id: true, title: true } },
			},
		})
	}
}

export const likeService = new LikeService()
