import express, { Request, Response } from 'express'
import { authRouter } from './routes/auth.routes'
import { commentRouter } from './routes/comment.routes'
import { favoriteRouter } from './routes/favorite.routes'
import { friendRequestRouter } from './routes/friend-request.routes'
import { friendshipRouter } from './routes/friendship.routes'
import { likeRouter } from './routes/like.routes'
import { postRouter } from './routes/post.routes'
import { userRouter } from './routes/user.routes'

const app = express()
app.use(express.json())

const PORT = 4400

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)
app.use('/api/like', likeRouter)
app.use('/api/favorite', favoriteRouter)
app.use('/api/friend-request', friendRequestRouter)
app.use('/api/friendship', friendshipRouter)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
