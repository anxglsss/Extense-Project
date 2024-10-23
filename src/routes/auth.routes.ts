import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { LoginUserSchema, RegisterUserSchema } from '../dtos/user.dto'
import { validationMiddleware } from '../middlewares/validation.middleware'

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
