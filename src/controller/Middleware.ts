import { NextFunction, Request, Response } from 'express'
import { prisma } from '../database/prisma'

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction){
    const username = req.headers.username as string

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    console.log('user',user)

    if (user) {
        req.user = user 
        return next() 
    } else {
        return res.status(404).json({ error: 'User not exists' })
    }
}