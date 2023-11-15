import express from 'express'
import { userRouter } from './UserRouter'
import { technologyRouter } from './TechnologyRouter'

export const router = express.Router()

router.use('/technologies', technologyRouter)
router.use('/users', userRouter)