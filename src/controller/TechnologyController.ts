import { Request, Response } from 'express'
import { z } from 'zod'
import { Technology } from '../model/Technology'
import { addTechnologyToUser, deleteUserTechnology, findManyUserTechnologies, findUniqueUserTechnology, updateUsersTechnologyStudied, updateUsersTechnologyTitleDeadline } from '../services/technologyUtils'
import { User } from '../model/User'


export async function getAllTechnologies(req: Request, res: Response){
    console.log('efetuando a rota get technologies')

    const user = req.user as User
    
    try {
        const technologies: Technology[] = findManyUserTechnologies(user)

        if (technologies.length > 0) {
            res.status(200).send(technologies)
        } else {
            res.status(404).send({ error: 'Technologies not exists' })
        }
    } catch (error) {
        console.error('Error listing technologies', error)
        res.status(500).send({ error: 'Internal server error while listing technologies' })
    }
}

export async function createTechnology(req: Request, res: Response){
    console.log('efetuando a rota post technology')

    const user = req.user as User

    const bodySchema = z.object({
        title: z.string(),
        deadline: z.string()
    })

    const { title, deadline } = bodySchema.parse(req.body)

    try{
        const technology = addTechnologyToUser(user, title, deadline)

        if(technology){
            return res.status(201).send(technology)
        } else{
            return res.status(401).send('Error creating technology')
        }
    } catch (error) {
        console.error('Error creating technology:', error)
        return res.send({ error: 'Internal server error while creating technology' })
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
        
        let technology: Technology | null = findUniqueUserTechnology(user, id)

        if (!technology) {
            return res.status(404).send({ error: 'Technology not exists' })
        }

        technology = updateUsersTechnologyTitleDeadline(user, technology, title, deadline)
        
        return res.status(200).send(technology)

        
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
        const technology: Technology | null = findUniqueUserTechnology(user, id)

        if (!technology) {
            return res.status(404).send({ error: 'Technology not exists' })
        }

        const updatedTechnology = updateUsersTechnologyStudied(user, technology)

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
            const technology: Technology | null = findUniqueUserTechnology(user, id)

            if(technology){
                deleteUserTechnology(user, technology)
                return res.status(200).send({error: 'Technology deleted successfully'})
            } else{
                return res.status(404).send({error: 'Technology not exists'})
            }
        } catch(error){
            console.log(console.error(error))
            return res.send().send({ error: error }).status(404)
        }
        
    } else{
        return res.status(404).send({ error: 'User not exists' })
    }
}