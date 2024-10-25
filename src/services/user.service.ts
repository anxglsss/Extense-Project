import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserService {
	async getUsers() {
		return await prisma.user.findMany()
	}

	async getUserById(id: number) {
		return await prisma.user.findUnique({ where: { id } })
	}

	async updateUser(
		id: number,
		data: { email?: string; name?: string; password?: string }
	) {
		return await prisma.user.update({ where: { id }, data })
	}

	async deleteUser(id: number) {
		return await prisma.user.delete({ where: { id } })
	}

	async setAvatarUrl(id: number, avatarUrl: string) {
		return await prisma.user.update({ where: { id }, data: { avatarUrl } })
	}
}

export const userService = new UserService()
