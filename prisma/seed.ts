import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function resetDatabase() {
	// Сбрасываем все таблицы с использованием SQL-запросов
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
	await resetDatabase()

	const user = await prisma.user.create({
		data: {
			email: 'user@sdu.edu/.kz',
			name: 'Madiyar Abiken',
			password: '12345678',
			role: 'ADMIN',
			avatarUrl: '',
		},
	})
	console.log(user)
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
