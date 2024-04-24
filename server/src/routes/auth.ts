import dotenv from 'dotenv'
import express from "express"
import User from "../models/user"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import status from '../utils/httpStatusCode'
import errorUtils from '../utils/errorUtils'
import { z } from 'zod'
import type { ErrorStatus } from '../utils/errorUtils'

const router = express.Router()
dotenv.config()

const { resWithErr } = errorUtils
const secretKey = process.env.SECRET_KEY

if(!secretKey) {
    throw new Error("Secret key isn't defined !")
}

const createSchema = z.object({
    username: z.string(),
    password: z.string()
})

router.post('/register', async (req,res) => {
    try {
        const { username, password } = createSchema.parse(req.body)
        const hashedPswd = await bcrypt.hash(password,10)
        const user = await User.create({username, password: hashedPswd})
        const token = jwt.sign({userId: user._id},secretKey,{expiresIn: '1h'})
        res.status(status.OK_CREATED).json({token})
    } catch (err) {
        resWithErr(err,res)
    }
})

router.post('/login', async (req,res) => {
    try {
        const { username, password } = createSchema.parse(req.body)
        const user = await User.findOne({username})
        if(!user) {
            const err: ErrorStatus = {
                status: status.UNAUTHORIZED,
                message: `Wrong credentials`
            }
            throw err
        }
        const match = await bcrypt.compare(password,user.password);
        if(!match) {
            const err: ErrorStatus = {
                status: status.UNAUTHORIZED,
                message: `Wrong credentials`
            }
            throw err
        }
        const token = jwt.sign({userId: user._id},secretKey,{expiresIn: '1h'})
        res.status(status.OK).json({token})
    } catch (err) {
        resWithErr(err,res)
    }
})


export default router