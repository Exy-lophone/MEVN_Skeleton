/*===================== IMPORTS ======================*/

import express from "express"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import prisma from "../../prisma/prisma"
import { z } from "zod"
import type { ErrorStatus } from "../utils/errorUtils"

/*====================== UTILS =======================*/

const router = express.Router()
const { resWithErr } = errorUtils

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        const room = await prisma.room.create({
            data: {
                name
            }
        })
        res.status(status.OK_CREATED).json(room)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/', async (req,res) => {
    try {
        const rooms = await prisma.room.findMany()
        res.status(status.OK).json(rooms)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const room = await prisma.room.findUnique({
            where: { id }
        })
        if(!room) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `Room with id ${id} doesn't exist`
            }
            throw err
        }
        res.status(status.OK).json(room)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const { id, name } = req.body
        const room = await prisma.room.update({
            where: { id },
            data: { id, name }
        })
        res.status(status.OK).json(room)
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/:id', async (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const room = await prisma.room.delete({
            where: {id}
        })
        res.status(status.OK).json(room)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router