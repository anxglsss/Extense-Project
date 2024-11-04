import { LoginUserDto, RegisterUserDto } from '@/dtos/user.dto'
import { tokenService } from '@/services/token.service'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AuthService {
	async loginUser(user: LoginUserDto) {
		const existingUser = await prisma.user.findUnique({
			where: { email: user.email },
		})
		if (!existingUser || user.password !== existingUser.password) {
			throw new Error('User not found')
		}
		const accessToken = tokenService.generateAccessToken(existingUser.id)
		const refreshToken = tokenService.generateRefreshToken(existingUser.id)

		await prisma.user.update({
			where: { id: existingUser.id },
			data: {
				refreshToken,
			},
		})

		return { accessToken, refreshToken }
	}

	async registerUser(user: RegisterUserDto) {
		const existingUser = await prisma.user.findUnique({
			where: { email: user.email },
		})
		if (existingUser) {
			throw new Error('User already exists')
		}

		const newUser = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				role: 'USER',
				avatarUrl: '',
			},
		})
		const accessToken = tokenService.generateAccessToken(newUser.id)
		const refreshToken = tokenService.generateRefreshToken(newUser.id)

		await prisma.user.update({
			where: { id: newUser.id },
			data: {
				refreshToken,
			},
		})

		return { accessToken, refreshToken }
	}

	async refreshToken(refreshToken: string) {
		const user = await tokenService.verifyRefreshToken(refreshToken)
		const newAccessToken = tokenService.generateAccessToken(user.id)

		return { accessToken: newAccessToken }
	}

	async logout(userId: number) {
		await tokenService.revokeRefreshToken(userId)
	}
}

export const authService = new AuthService()
