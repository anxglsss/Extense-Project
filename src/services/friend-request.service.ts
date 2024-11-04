import { FriendRequestDto } from '@/dtos/friend-request.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class FriendRequestService {
	async sendRequest(request: FriendRequestDto) {
		const existingRequest = await prisma.friendRequest.findFirst({
			where: {
				senderId: request.senderId,
				receiverId: request.receiverId,
			},
		})
		const existingFriendship = await prisma.friendship.findFirst({
			where: {
				OR: [
					{ user1Id: request.senderId, user2Id: request.receiverId },
					{ user1Id: request.receiverId, user2Id: request.senderId },
				],
			},
		})
		if (
			existingRequest ||
			existingFriendship ||
			request.senderId === request.receiverId
		) {
			throw new Error('Request already exists')
		}
		return await prisma.friendRequest.create({
			data: {
				senderId: request.senderId,
				receiverId: request.receiverId,
				status: 'PENDING',
			},
			include: {
				receiver: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				sender: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
	}
	async responseToRequest(requestId: number, status: 'REJECTED' | 'ACCEPTED') {
		const request = await prisma.friendRequest.update({
			where: { id: requestId },
			data: {
				status,
			},
			include: {
				receiver: true,
				sender: true,
			},
		})
		if (status === 'ACCEPTED') {
			await prisma.friendship.create({
				data: {
					user1Id: request.senderId,
					user2Id: request.receiverId,
				},
			})
		}
	}
	async getPendingRequests(userId: number) {
		return await prisma.friendRequest.findMany({
			where: {
				receiverId: userId,
				status: 'PENDING',
			},
			include: {
				sender: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
	}
	async getAcceptedRequests(userId: number) {
		return await prisma.friendRequest.findMany({
			where: {
				receiverId: userId,
				status: 'ACCEPTED',
			},
			include: {
				sender: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
	}
	async getSendRequests(userId: number) {
		return await prisma.friendRequest.findMany({
			where: {
				senderId: userId,
				status: 'PENDING',
			},
			include: {
				receiver: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
			},
		})
	}
	async deleteRequest(requestId: number) {
		return await prisma.friendRequest.delete({ where: { id: requestId } })
	}
}

export const friendRequestService = new FriendRequestService()
