import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../database/prisma'

export async function getUser(req: Request, res: Response){
    try {
        const users = await prisma.user.findMany() 
        console.log(users)
        if (users.length > 0) {
            res.send(users) 
        } else {
            res.send({ erro: 'Nenhum usuário encontrado' }).status(404)
        }
    } catch (error) {
        console.error('Erro ao listar usuários:', error)
        res.send({ erro: 'Erro ao listar usuários' }).status(500)
    }
}

export async function createUser(req: Request, res: Response) {
    const bodySchema = z.object({
        name: z.string(),
        username: z.string()
    })

    const { name, username } = bodySchema.parse(req.body)

    let user = await prisma.user.findUnique({
        where: { 
            username 
        },
    })

    if (user) {
        res.status(400).send({error:'Usuário com esse username já existe'})
    } else {
        try {
            user = await prisma.user.create({ 
                data:{
                    name,
                    username,
                }})
            res.status(201).send(user)
        } catch (error) {
            console.log(console.error('Erro ao listar usuários:', error))
            res.status(500).send({error:'Erro ao criar usuário'})
        }
    }
}
