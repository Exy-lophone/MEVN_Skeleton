import config from './utils/config'
import express from 'express'
import cors from 'cors'

//init
const app = express()

//Routers
import authRouter from './routes/auth'
import itemsRouter from './routes/items'
import categoriesRouter from './routes/categories'
import closetsRouter from './routes/closets'
import roomsRouter from './routes/rooms'

//Set up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/items', itemsRouter)
app.use('/categories', categoriesRouter)
app.use('/closets', closetsRouter)
app.use('/rooms', roomsRouter)

//Start listening
app.listen(process.env.PORT, () => console.log(`Server started at: http://localhost:${config.PORT}`))

app.get('/', (req, res) => {
    res.status(200).json({message:"Server is running !"})
})