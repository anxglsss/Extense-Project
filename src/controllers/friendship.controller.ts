import { friendshipService } from '@/services/friendship.service'
import { Request, Response } from 'express'

class FriendshipController {
	async getFriends(req: Request, res: Response) {
		try {
			const friends = await friendshipService.getFriends(
				(req as UserRequest).user.id
			)
			res.status(200).json(friends)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async deleteFriendship(req: Request, res: Response) {
		try {
			await friendshipService.deleteFriendship(Number(req.params.friendshipId))
			res.status(200).json({ message: 'Friendship deleted successfully' })
		} catch (error) {
			res.status(400).json(error)
		}
	}
}

export const friendshipController = new FriendshipController()

interface UserRequest extends Request {
	user: any
}
