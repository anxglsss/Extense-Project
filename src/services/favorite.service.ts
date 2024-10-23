import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class FavoriteService {
	async favoritePost(userId: number, postId: number) {
		return await prisma.favorite.create({
			data: {
				userId,
				postId,
			},
		})
	}

	async unfavoritePost(userId: number, postId: number) {
		return await prisma.favorite.deleteMany({
			where: {
				userId,
				postId,
			},
		})
	}

	async getFavoritesByPost(postId: number) {
		const favorites = await prisma.favorite.findMany({
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
		return favorites
	}

	async getFavoritesByUser(userId: number) {
		const favorites = await prisma.favorite.findMany({
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
		return favorites
	}
}

export const favoriteService = new FavoriteService()
