import { PrismaClient } from '@prisma/client'
import { FriendRequestDto } from '../dtos/friend-request.dto'

const prisma = new PrismaClient()

class FriendRequestService {
	async sendRequest(request: FriendRequestDto) {
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
				sender: true,
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
