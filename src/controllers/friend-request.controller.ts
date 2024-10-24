import { Request, Response } from 'express'
import { friendRequestService } from '../services/friend-request.service'

class FriendRequestController {
	async sendRequest(req: Request, res: Response) {
		const senderId = (req as UserRequest).user.id
		const receiverId = Number(req.params.receiverId)

		try {
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
			await friendRequestService.responseToRequest(
				Number(req.params.requestId),
				req.body.status
			)
			res.status(200).json({ message: 'Request status changed' })
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getPendingRequests(req: Request, res: Response) {
		try {
			const requests = await friendRequestService.getPendingRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getAcceptedRequests(req: Request, res: Response) {
		try {
			const requests = await friendRequestService.getAcceptedRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async getSendRequests(req: Request, res: Response) {
		try {
			const requests = await friendRequestService.getSendRequests(
				(req as UserRequest).user.id
			)
			res.status(200).json(requests)
		} catch (error) {
			res.status(400).json(error)
		}
	}
	async deleteRequest(req: Request, res: Response) {
		try {
			await friendRequestService.deleteRequest(Number(req.params.requestId))
			res.status(200).json({ message: 'Request deleted' })
		} catch (error) {
			res.status(400).json(error)
		}
	}
}
export const friendRequestController = new FriendRequestController()

interface UserRequest extends Request {
	user: any
}
