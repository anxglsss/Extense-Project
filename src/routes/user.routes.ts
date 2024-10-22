import { Router } from 'express'
import { userController } from '../controllers/user.controller'

export const userRouter = Router()

userRouter.get('/all', userController.getAllUsers)
userRouter.get('/:id', userController.getUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
