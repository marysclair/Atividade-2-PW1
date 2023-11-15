import { Request, Response } from 'express'
import { z } from 'zod'

import { addUser, findManyUsers, findUniqueUser } from '../services/userUtils'

export async function getUser(req: Request, res: Response){

    try {
        const users = findManyUsers()
        console.log(users)
        if (users.length > 0) {
            res.send(users) 
        } else {
            res.status(404).send({ erro: 'Users not exists' })
        }
    } catch (error) {
        console.error('Error listing users', error)
        res.status(500).send({ erro: 'Internal server error while listing users' })
    }
}

export function createUser(req: Request, res: Response) {
    const bodySchema = z.object({
        name: z.string(),
        username: z.string()
    })

    const { name, username } = bodySchema.parse(req.body)

    let user = findUniqueUser(username)

    if (user) {
        res.status(400).send({error:'User with that username already exists'})
    } else {
        try {
            user = addUser(name, username)
            res.status(201).send(user)
        } catch (error) {
            console.log(console.error('Error creating users', error))
            res.status(500).send({error:'Internal server error while creating user'})
        }
    }
}
