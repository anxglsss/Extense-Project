import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class Friendship {
	async getFriends(userId: number) {
		return await prisma.friendship.findMany({
			where: {
				OR: [
					{
						user1Id: userId,
					},
					{
						user2Id: userId,
					},
				],
			},
			include: {
				user1: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				user2: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
	}
	async deleteFriendship(friendshipId: number) {
		return await prisma.friendship.delete({
			where: {
				id: friendshipId,
			},
		})
	}
}

export const friendshipService = new Friendship()
