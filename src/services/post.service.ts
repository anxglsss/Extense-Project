import { PrismaClient } from '@prisma/client'
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto'

const prisma = new PrismaClient()

class PostService {

	async getPosts() {
		return await prisma.post.findMany()
	}

	async getOnePost(id: number) {
		return await prisma.post.findUnique({ where: { id } })
	}

	async createPost(post: CreatePostDto, userId: number) {
		return await prisma.post.create({
			data: {
				title: post.title,
				content: post.content,
				userId: userId,
			},
		})
	}

	async updatePost(id:number, data:UpdatePostDto){
		return await
	}
}
export const postService = new PostService()
