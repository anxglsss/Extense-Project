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

	async removeFromFavorite(userId: number, postId: number) {
		await prisma.favorite.deleteMany({
			where: {
				userId,
				postId,
			},
		})
	}

	async getFavoritesByPost(postId: number) {
		return await prisma.favorite.findMany({
			where: {
				postId,
			},
			include: {
				user: { select: { id: true, name: true, avatarUrl: true } },
			},
		})
	}

	async getFavoritesByUser(userId: number) {
		return await prisma.favorite.findMany({
			where: {
				userId,
			},
			include: {
				post: { select: { id: true, title: true } },
			},
		})
	}
}

export const favoriteService = new FavoriteService()
