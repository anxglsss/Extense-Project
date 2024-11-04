import { userService } from '@/services/user.service'
import { Request, Response } from 'express'

class UserController {
	async getAllUsers(req: Request, res: Response) {
		try {
			const users = await userService.getUsers()
			res.status(200).json(users)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const user = await userService.getUserById(Number(req.params.id))
			res.status(200).json(user)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const user = await userService.updateUser(Number(req.params.id), req.body)
			res.status(200).json(user)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			await userService.deleteUser(Number(req.params.id))
			res.status(200).json({ message: 'User deleted' })
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async setAvatar(req: Request, res: Response) {
		try {
			const user = await userService.setAvatarUrl(
				Number(req.params.id),
				(req as UserRequest).file.location
			)
			res.status(200).json(user)
		} catch (error) {
			res.status(404).json(error)
		}
	}
}

export const userController = new UserController()

interface UserRequest extends Request {
	user: any
	file: any
}
