import express from 'express'
import { router } from './routes'

const app = express()
app.use(express.json())

const port = 1616

app.use(router)

app.listen(port, () => {
    console.log(`rodando na porta: ${port}`)
})