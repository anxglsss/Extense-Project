import { postService } from '@/services/post.service'
import { Request, Response } from 'express'

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
			console.log('req.file:', (req as UserRequest).file)

			const createdPost = await postService.createPost(
				req.body,
				(req as UserRequest).user.id,
				(req as UserRequest).file ? (req as UserRequest).file.location : null
			)

			res.status(201).json(createdPost)
		} catch (error) {
			console.error('Error:', error)
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

	async getPostsByDateRecent(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByDateRecent()
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByDateOldest(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByDateLate()
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByLikes(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByLikes()
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByFavorites(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByFavorites()
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByFriends(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByFriends(
				(req as UserRequest).user.id
			)
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByContainsImage(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByContainsImage(true)
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}

	async getPostsByNotContainsImage(req: Request, res: Response) {
		try {
			const posts = await postService.getPostsByContainsImage(false)
			res.status(200).json(posts)
		} catch (error) {
			res.status(404).json(error)
		}
	}
}

export const postController = new PostController()

interface UserRequest extends Request {
	user: any
	file: any
}
