import express, { Request, Response } from 'express'
import { authRouter } from './routes/auth.routes'
import { userRouter } from './routes/user.routes'

const app = express()
app.use(express.json())

const PORT = 4400

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
