interface User{
  id: string
  name: string
  username: string
}

declare namespace Express {
  export interface Request {
      user: User;
    }
  }