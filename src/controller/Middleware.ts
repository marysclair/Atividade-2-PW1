import { NextFunction, Request, Response } from 'express'
import { findUniqueUser } from '../services/userUtils'

export async function checkExistsUserAccount(req: Request, res: Response, next: NextFunction){
    const username = req.headers.username as string
    
    const user = findUniqueUser(username)

    if (user) {
        req.user = user 
        return next() 
    } else {
        return res.status(404).json({ error: 'User not exists' })
    }
}