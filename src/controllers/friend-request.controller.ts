import { Request, Response } from 'express'
import { friendRequestService } from '../services/friend-request.service'

class FriendRequestController {
	async sendRequest(req: UserRequest, res: Response) {
		try {
			const senderId = (req as UserRequest).user.id
			const receiverId = Number(req.params.receiverId)

			const request = await friendRequestService.sendRequest({
				senderId,
				receiverId,
			})
			res.status(201).json(request)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async responseToRequest(req: Request, res: Response) {
		try {
			const response = await friendRequestService.responseToRequest(
				Number(req.params.requestId),
				req.body.status
			)
			res.status(200).json(response)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getPendingRequests(req: UserRequest, res: Response) {
		try {
			const requests = await friendRequestService.getPendingRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getAcceptedRequests(req: UserRequest, res: Response) {
		try {
			const requests = await friendRequestService.getAcceptedRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getSendRequests(req: UserRequest, res: Response) {
		try {
			const requests = await friendRequestService.getSendRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
}
export const friendRequestController = new FriendRequestController()

interface UserRequest extends Request {
	user: any
}
