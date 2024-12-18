import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserService {
	async getUsers() {
		return await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				avatarUrl: true,
				posts: true,
			},
		})
	}

	async getUserById(id: number) {
		return await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				avatarUrl: true,
				posts: true,
			},
		})
	}

	async updateUser(
		id: number,
		data: { email?: string; name?: string; password?: string }
	) {
		return await prisma.user.update({
			where: { id },
			data,
			select: {
				id: true,
				name: true,
				email: true,
				avatarUrl: true,
				posts: true,
			},
		})
	}

	async deleteUser(id: number) {
		return await prisma.user.delete({ where: { id } })
	}

	async setAvatarUrl(id: number, avatarUrl: string) {
		return await prisma.user.update({
			where: { id },
			data: { avatarUrl },
			select: {
				id: true,
				name: true,
				email: true,
				avatarUrl: true,
				posts: true,
			},
		})
	}
}

export const userService = new UserService()
