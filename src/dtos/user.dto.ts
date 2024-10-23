import { z } from 'zod'

export const LoginUserSchema = z.object({
	email: z.string().email('Invalid Email'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const RegisterUserSchema = z.object({
	email: z.string().email('Invalid Email'),
	name: z.string(),
	password: z.string().min(6, 'Password must be at least 6 characters'),
	role: z.enum(['ADMIN', 'USER']).default('USER'),
})

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>
export type LoginUserDto = z.infer<typeof LoginUserSchema>
