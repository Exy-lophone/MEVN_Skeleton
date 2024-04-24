import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

//init
dotenv.config()
const app = express()

//Routers
import authRouter from './routes/auth'
import itemsRouter from './routes/items'
import closetsRouter from './routes/closets'

//Connect to db
mongoose.connect(process.env.CONN_STR ? process.env.CONN_STR : '');
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

//Set up middlewares
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/items', itemsRouter)
app.use('/closets', closetsRouter)

//Start listening
app.listen(process.env.PORT, () => console.log(`Server started at: http://localhost:${process.env.PORT}`))

app.get('/', (req, res) => {
    res.status(200).json({message:"Server is running !"})
})