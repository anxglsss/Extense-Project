import { FavoriteDto } from '@/dtos/favorite.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class FavoriteService {
	async favoritePost(favorite: FavoriteDto) {
		const existingFav = await prisma.favorite.findFirst({
			where: {
				userId: favorite.userId,
				postId: favorite.postId,
			},
		})
		if (existingFav) {
			throw new Error('User has already add to favorite this post')
		}
		return await prisma.favorite.create({
			data: {
				userId: favorite.userId,
				postId: favorite.postId,
			},
		})
	}

	async removeFromFavorite(favorite: FavoriteDto) {
		await prisma.favorite.deleteMany({
			where: {
				userId: favorite.userId,
				postId: favorite.postId,
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
