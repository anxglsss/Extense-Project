import { PrismaClient } from '@prisma/client'
import { FriendRequestDto } from '../dtos/friend-request.dto'

const prisma = new PrismaClient()

class FriendRequestService {
	async sendRequest(request: FriendRequestDto) {
		const existingRequest = await prisma.friendRequest.findFirst({
			where: {
				senderId: request.senderId,
				receiverId: request.receiverId,
			},
		})
		if (existingRequest) {
			throw new Error('Request already exists')
		}
		return await prisma.friendRequest.create({
			data: {
				senderId: request.senderId,
				receiverId: request.receiverId,
				status: 'PENDING',
			},
			include: {
				receiver: true,
				sender: true,
			},
		})
	}
	async responseToRequest(requestId: number, status: 'REJECTED' | 'ACCEPTED') {
		await prisma.friendRequest.update({
			where: { id: requestId },
			data: {
				status,
			},
			include: {
				receiver: true,
				sender: true,
			},
		})
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
			},
			include: {
				receiver: true,
			},
		})
	}
}

export const friendRequestService = new FriendRequestService()
