import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { uploadToS3 } from '../middlewares/upload.middleware'

export const userRouter = Router()

userRouter.get('/all', userController.getAllUsers)
userRouter.get('/:id', userController.getUser)
userRouter.put('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)
userRouter.patch(
	'/avatar/:id',
	uploadToS3('avatar-imagebucket', 'avatarUrl'),
	userController.setAvatar
)
