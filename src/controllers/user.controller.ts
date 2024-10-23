import { Request, Response } from 'express'
import { userService } from '../services/user.service'

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
}

export const userController = new UserController()
