import { Request, Response } from 'express'
import { prisma } from '../database/prisma'
import { Technology, User } from '@prisma/client'
import { z } from 'zod'


export async function getAllTechnologies(req: Request, res: Response){
    console.log('efetuando a rota get technologies')

    const user = req.user as User
    
    try {
        const technologies: Technology[] = await prisma.technology.findMany({
            where: {
                userId: user.id
            }
        })
        console.log(technologies)
        if (technologies.length > 0) {
            res.status(200).send(technologies)
        } else {
            res.status(404).send({ error: 'Tecnology not exists' })
        }
    } catch (error) {
        console.error('Error listing technology', error)
        res.status(500).send({ error: 'Internal server error while listing technologies' })
    }
}

export async function createTechnology(req: Request, res: Response){
    console.log('efetuando a rota post technology')

    const user = req.user as User
    console.log('user id:', user.id)

    const bodySchema = z.object({
        title: z.string(),
        deadline: z.string()
    })

    const { title, deadline } = bodySchema.parse(req.body)
    console.log(title, deadline)
    try{
        const technology = await prisma.technology.create({
            data: {
                title,
                deadline: new Date(deadline),
                userId: user.id
            }
        })
        console.log(technology)
        if(technology){
            return res.send(technology).status(201)
        } else{
            return res.send('Error creating technology').status(401)
        }
    } catch (error) {
        console.error('Error creating technology:', error)
        return res.send({ error: 'Internal server error while creating technology' }).status(500)
    }
    
}

export async function updateTechnology(req: Request, res: Response){
    console.log('efetuando a rota put technology')

    const user = req.user as User

    const bodySchema = z.object({
        title: z.string(),
        deadline: z.string()
    })
    
    const { title, deadline } = bodySchema.parse(req.body)
    
    const { id } = req.params

    if (!user) {
        return res.status(404).send({ error: 'User not exists' })
    }

    try{
        const technology = await prisma.technology.update({
            where: {
                id,
            },
            data: {
                title,
                deadline: new Date(deadline)
            },
        })
        
        if(technology){
            return res.send(technology).status(200)
        }else{
            return res.send({ error: 'Error updating technology' }).status(404)
        }
    } catch(error) {
        console.error('Error updating technology:', error)
        return res.status(500).send({ error: 'Internal server error while updating technology' })
    }
}

export async function patchTechnology(req: Request, res: Response){
    console.log('efetuando rota patch technology')
    const user = req.user as User

    const { id } = req.params

    if (!user) {
        return res.status(404).send({ error: 'User not exists' })
    }

    try {
        const technology = await prisma.technology.findUnique({
            where: {
                id,
            },
        })


        if (!technology) {
            return res.status(404).send({ error: 'Technology not exists' })
        }

        const updatedTechnology = await prisma.technology.update({
            where: {
                id,
            },
            data: {
                id: technology.id,
                studied: true, 
                title: technology.title,
                deadline: technology.deadline,
                createdAt: technology.createdAt,
                userId: user.id
            },
        })

        return res.status(200).send(updatedTechnology)
    } catch (error) {
        console.error('Error updating technology:', error)
        return res.status(500).send({ error: 'Internal server error while updating technology' })
    }
}

export async function deleteTechnology(req: Request, res: Response){
    console.log('efetuando rota delete technology')
    const user = req.user as User

    const { id } = req.params

    if(user){
        try{
            await prisma.technology.delete({
                where: {
                    id,
                }
            })
            return res.send({error: 'Technology deleted successfully.'}).status(200)
        } catch(error){
            console.log(console.error(error))
            return res.send().send({ error: error }).status(404)
        }
        
    } else{
        return res.status(404).send({ error: 'User not exists' })
    }
}