import { PrismaClient } from '@prisma/client'
import { LoginUserDto, RegisterUserDto } from '../dtos/user.dto'
import { tokenService } from './token.service'

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
				refreshToken: {
					create: {
						token: refreshToken,
						expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					},
				},
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
			},
		})
		const accessToken = tokenService.generateAccessToken(newUser.id)
		const refreshToken = tokenService.generateRefreshToken(newUser.id)

		await prisma.user.update({
			where: { id: newUser.id },
			data: {
				refreshToken: {
					create: {
						token: refreshToken,
						expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
					},
				},
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
