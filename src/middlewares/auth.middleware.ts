import { tokenService } from '@/services/token.service'
import { NextFunction, Request, Response } from 'express'

interface UserRequest extends Request {
	user?: any
}

export const authMiddleware = async (
	req: UserRequest,
	res: Response,
	next: NextFunction
) => {
	const header = req.headers['authorization']
	const token = header && header.split(' ')[1]
	if (!token) {
		return res.status(401).json({ error: 'No token provided' })
	}
	try {
		const user = await tokenService.verifyAccessToken(token)
		req.user = user
		next()
	} catch (error) {
		return res.status(403).json({ error: 'Invalid token' })
	}
}
