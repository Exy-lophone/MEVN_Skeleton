import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY

if(!DATABASE_URL) throw new Error('[.env] DATABASE_URL is not defined')
if(!PORT) throw new Error('[.env] PORT is not defined')
if(!SECRET_KEY) throw new Error('[.env] SECRET_KEY is not defined')

export default {
    DATABASE_URL,
    PORT,
    SECRET_KEY
}