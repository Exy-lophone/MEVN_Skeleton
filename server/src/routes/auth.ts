import config from "../utils/config"
import express from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import status from '../utils/httpStatusCode'
import errorUtils from '../utils/errorUtils'
import { z } from 'zod'
import type { ErrorStatus } from '../utils/errorUtils'
import prisma from "../../prisma/prisma"
import verifyToken from "../middlewares/authVerify"

const router = express.Router()
const { resWithErr } = errorUtils
const parser = z.object({
    username: z.string(),
    password: z.string()
})
const wrongCredErr: ErrorStatus = {
    status: status.UNAUTHORIZED,
    message: `Wrong credentials`
}

router.post('/register', async (req,res) => {
    try {
        const { username, password } = parser.parse(req.body)
        const hashedPswd = await bcrypt.hash(password,10)
        const user = await prisma.user.create({
            data: { username, password: hashedPswd }
        })
        const token = jwt.sign({userId: user.id},config.SECRET_KEY,{expiresIn: '1h'})
        res.status(status.OK_CREATED).json({token})
    } catch (err) {
        resWithErr(err,res)
    }
})

router.post('/login', async (req,res) => {
    try {
        const { username, password } = parser.parse(req.body)
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if(!user) throw wrongCredErr
        const match = await bcrypt.compare(password,user.password);
        if(!match) throw wrongCredErr
        const token = jwt.sign({userId: user.id},config.SECRET_KEY,{expiresIn: '1h'})
        res.status(status.OK).json({token})
    } catch (err) {
        resWithErr(err,res)
    }
})

router.get('/verify',verifyToken,(req,res,next) => res.status(status.OK).json({authentication: true}))

export default router