import { Technology } from './Technology'

export interface User{
    id: string
    name: string
    username: string
    technologies: Technology[]
  }
