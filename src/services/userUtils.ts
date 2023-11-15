import { v4 as uuidv4 } from 'uuid'
import { userDb } from '../database/user'
import { User } from '../model/User'

export function findUniqueUser(username: string){
    const userFound = userDb.find((user) => {
        return user.username === username
    })


    if(!userFound){
        return null
    }
    
    return userFound
}

export function findManyUsers(){
    return userDb
}

export function addUser(name: string, username: string){
    const createdUser: User = {
        id: uuidv4(),
        name,
        username,
        technologies: []
    }
    console.log(createdUser)
    userDb.push(createdUser)
    return createdUser
}
