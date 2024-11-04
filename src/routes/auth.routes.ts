import { authController } from '@/controllers/auth.controller'
import { authMiddleware } from '@/middlewares/auth.middleware'
import { validationMiddleware } from '@/middlewares/validation.middleware'
import { Router } from 'express'
import { LoginUserSchema, RegisterUserSchema } from '../dtos/user.dto'

export const authRouter = Router()

authRouter.post(
	'/login',
	validationMiddleware(LoginUserSchema),
	authController.login
)
authRouter.post(
	'/register',
	validationMiddleware(RegisterUserSchema),
	authController.register
)
authRouter.post('/logout', authMiddleware as any, authController.logout)
authRouter.post('/refresh-token', authController.refreshToken)
