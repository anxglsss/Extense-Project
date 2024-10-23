import { Request, Response } from 'express'
import { postService } from '../services/post.service'

class PostController {
	async getAllPosts(req: Request, res: Response) {
		try {
			const posts = await postService.getPosts()
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostById(req: Request, res: Response) {
		try {
			const post = await postService.getPostById(Number(req.params.id))
			res.status(200).json(post)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async createPost(req: Request, res: Response) {
		try {
			const createdPost = await postService.createPost(
				req.body,
				(req as UserRequest).user.id
			)
			res.status(201).json(createdPost)
		} catch (error) {
			res.status(400).json(error)
		}
	}

	async updatePost(req: Request, res: Response) {
		try {
			const updatedPost = await postService.updatePost(
				Number(req.params.id),
				req.body
			)
			res.status(200).json(updatedPost)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async deletePost(req: Request, res: Response) {
		try {
			await postService.deletePost(Number(req.params.id))
			res.status(200).json({ message: 'Post deleted' })
		} catch (error) {
			res.status(404).json(error)
		}
	}
}

export const postController = new PostController()

interface UserRequest extends Request {
	user: any
}
