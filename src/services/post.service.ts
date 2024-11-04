import { CreatePostDto, UpdatePostDto } from '@/dtos/post.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class PostService {
	async getPosts() {
		return await prisma.post.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostById(id: number) {
		return await prisma.post.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async createPost(post: CreatePostDto, userId: number, imageUrl: string) {
		return await prisma.post.create({
			data: {
				title: post.title,
				content: post.content,
				imageUrl: imageUrl,
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
				id,
			},
		})
	}

	//Filtration

	async getPostsByDateRecent() {
		return await prisma.post.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostsByDateLate() {
		return await prisma.post.findMany({
			orderBy: {
				createdAt: 'asc',
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostsByLikes() {
		return await prisma.post.findMany({
			orderBy: {
				likes: {
					_count: 'desc',
				},
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostsByFavorites() {
		return await prisma.post.findMany({
			orderBy: {
				favorite: {
					_count: 'desc',
				},
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostsByFriends(friendId: number[]) {
		return await prisma.post.findMany({
			where: {
				userId: {
					in: friendId,
				},
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						avatarUrl: true,
					},
				},
				comments: {
					select: {
						id: true,
						content: true,
						userId: true,
						postId: true,
					},
				},
				likes: {
					select: { id: true, userId: true, postId: true },
				},
				favorite: {
					select: { id: true, userId: true, postId: true },
				},
				tags: {
					select: { id: true, name: true },
				},
			},
		})
	}

	async getPostsByContainsImage(hasImage: boolean) {
		return await prisma.post.findMany({
			where: {
				imageUrl: hasImage ? { not: null } : null,
			},
		})
	}
}
export const postService = new PostService()
