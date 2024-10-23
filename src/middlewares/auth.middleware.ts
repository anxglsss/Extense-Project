import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { tokenService } from '../services/token.service'

const prisma = new PrismaClient()

export async function authMiddleware(
	req: UserRequest,
	res: Response,
	next: NextFunction
) {
	const header = req.headers['authorization']
	const token = header && header.split(' ')[1]

	if (!token) {
		res.status(401).json({ error: 'No token provided' })
	}
	try {
		if (token == undefined) throw new Error()
		const user = await tokenService.verifyAccessToken(token)

		req.user = user.user
		next()
	} catch (error) {
		return res.status(403).json({ error: 'Invalid token' })
	}
}

interface UserRequest extends Request {
	user: any
}
