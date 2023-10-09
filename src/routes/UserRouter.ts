import express from 'express'
import { createUser, getUser } from '../controller/UserController'

export const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', getUser)

