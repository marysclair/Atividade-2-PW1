// import { Technology } from '../model/Technology'
import { Technology } from '../model/Technology'
import { User } from '../model/User'
import { v4 as uuidv4 } from 'uuid'

export function findUniqueUserTechnology(user: User, id: string){
    const foundTechnology = user.technologies.find((technology) => {
        return technology.id === id
    })

    if(!foundTechnology){
        return null
    }

    return foundTechnology
}

export function findManyUserTechnologies(user: User){
    return user.technologies
}

export function addTechnologyToUser(user: User, title: string, deadline: string){
    const technology: Technology = {
        id: uuidv4(),
        title,
        studied: false,
        deadline: new Date(deadline),
        createdAt: new Date()
    }

    user.technologies.push(technology)

    return technology
}

export function updateUsersTechnologyTitleDeadline(user: User, technology: Technology, title: string, deadline: string){
    user?.technologies.map((userTechnology) => {
        if (userTechnology.id === technology.id) {
            userTechnology.title = title
            userTechnology.deadline = new Date(deadline)
        }

        return userTechnology
    })

    return technology
}

export function updateUsersTechnologyStudied(user: User, technology: Technology){
    user?.technologies.map((userTechnology) => {
        if (userTechnology.id === technology.id) {
            userTechnology.studied = !userTechnology.studied
        }

        return userTechnology
    })

    return technology
}

export function deleteUserTechnology(user: User, technology: Technology){
    user.technologies.splice(user.technologies.indexOf(technology), 1)
}