import { PrismaClient } from '@prisma/client'
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto'

const prisma = new PrismaClient()

class PostService {
	async getPosts() {
		return await prisma.post.findMany()
	}

	async getPostById(id: number) {
		return await prisma.post.findUnique({ where: { id } })
	}

	async createPost(post: CreatePostDto, userId: number) {
		return await prisma.post.create({
			data: {
				title: post.title,
				content: post.content,
				imageUrl: post.imageUrl,
				userId: userId,
			},
		})
	}

	async updatePost(id: number, post: UpdatePostDto) {
		return await prisma.post.update({
			where: {
				id: id,
			},
			data: { ...post },
		})
	}

	async deletePost(id: number) {
		await prisma.post.delete({
			where: {
				id: id,
			},
		})
	}
}
export const postService = new PostService()
