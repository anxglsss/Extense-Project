import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

class TokenService {
	generateAccessToken(userId: number) {
		return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
			expiresIn: '1d',
		})
	}

	generateRefreshToken(userId: number) {
		return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
			expiresIn: '7d',
		})
	}

	async verifyAccessToken(token: string) {
		try {
			const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
				userId: number
			}
			if (!payload) throw new Error('Invalid token')
			const user = await prisma.user.findUnique({
				where: { id: payload.userId },
				select: { id: true, name: true, email: true, role: true },
			})

			return user
		} catch (error) {
			throw new Error('Invalid token')
		}
	}

	async verifyRefreshToken(token: string) {
		try {
			const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
				userId: number
			}
			const user = await prisma.user.findUnique({
				where: { id: payload.userId },
			})
			if (!user || (user.refreshToken && user.refreshToken !== token)) {
				throw new Error('Invalid token')
			}
			return user
		} catch (error) {
			throw new Error('Invalid token')
		}
	}

	async revokeRefreshToken(userId: number) {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		})
		if (user && user.refreshToken) {
			await prisma.user.update({
				where: { id: userId },
				data: { refreshToken: '' },
			})
		}
	}
}
export const tokenService = new TokenService()
