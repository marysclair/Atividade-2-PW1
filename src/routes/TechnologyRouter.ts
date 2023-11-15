import express from 'express'
import { checkExistsUserAccount } from '../middleware/Middleware' 
import { createTechnology, deleteTechnology, getAllTechnologies, patchTechnology, updateTechnology } from '../controller/TechnologyController'


export const technologyRouter = express.Router()

technologyRouter.get('/', checkExistsUserAccount, getAllTechnologies)
technologyRouter.post('/', checkExistsUserAccount, createTechnology)
technologyRouter.put('/:id', checkExistsUserAccount, updateTechnology)
technologyRouter.patch('/:id/studied', checkExistsUserAccount, patchTechnology)
technologyRouter.delete('/:id', checkExistsUserAccount, deleteTechnology)
