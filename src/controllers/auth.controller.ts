import { Request, Response } from 'express'
import { authService } from '../services/auth.service'

class AuthController {
	async register(req: Request, res: Response) {
		try {
			const user = await authService.registerUser(req.body)
			res.status(201).json(user)
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { accessToken, refreshToken } = await authService.loginUser(
				req.body
			)
			res.status(200).json({ accessToken, refreshToken })
		} catch (error) {
			res.status(401).json({ error: error })
		}
	}
}

export const authController = new AuthController()
