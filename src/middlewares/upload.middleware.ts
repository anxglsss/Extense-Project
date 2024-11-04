import { s3 } from '@/config/aws.config'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'

export const uploadToS3 = (bucketName: string, fileName: string) => {
	const upload = multer({
		storage: multerS3({
			s3: s3,
			bucket: bucketName,
			key: (req, file, cb) => {
				cb(null, `${Date.now()}-${file.originalname}`)
			},
		}),
	}).fields([
		{ name: fileName, maxCount: 1 },
		{ name: 'title', maxCount: 1 },
		{ name: 'content', maxCount: 1 },
	])

	return (req: Request, res: Response, next: NextFunction) => {
		upload(req, res, error => {
			if (error) {
				console.log(error)
				return res.status(500).json({ message: 'Error uploading file' })
			}
			next()
		})
	}
}
