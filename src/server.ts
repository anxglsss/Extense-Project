import express, { Request, Response } from 'express'
import { authRouter } from './routes/auth.routes'
import { commentRouter } from './routes/comment.routes'
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

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
