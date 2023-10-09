import express from 'express'
import { userRouter } from './routes/UserRouter'
import { technologyRouter } from './routes/TechnologyRouter'

const app = express()

app.use(express.json())
const port = 3636

app.use('/technologies', technologyRouter)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})