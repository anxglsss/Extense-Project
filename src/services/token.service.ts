import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const ACCESS_TOKEN_SECRET = 'access-token-secret'
const REFRESH_TOKEN_SECRET = 'refresh-token-secret'

class TokenService {
	generateAccessToken(userId: number) {
		return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
	}

	generateRefreshToken(userId: number) {
		return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
	}

	verifyAccessToken(token: string) {
		try {
			return jwt.verify(token, ACCESS_TOKEN_SECRET)
		} catch (error) {
			throw new Error('Invalid token')
		}
	}

	async verifyRefreshToken(token: string) {
		try {
			const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
				userId: number
			}
			const user = await prisma.user.findUnique({
				where: { id: payload.userId },
				include: { refreshToken: true },
			})
			if (!user || (user.refreshToken && user.refreshToken.token !== token)) {
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
			include: { refreshToken: true },
		})
		if (user && user.refreshToken) {
			await prisma.refreshToken.delete({ where: { id: user.refreshToken.id } })
		}
	}
}
export const tokenService = new TokenService()
