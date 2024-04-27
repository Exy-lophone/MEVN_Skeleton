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
        const { name, fk_room } = req.body
        const closet = await prisma.closet.create({
            data: {
                name,
                fk_room
            }
        })
        res.status(status.OK).json(closet)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/', async (req,res) => {
    try {
        const closets = await prisma.closet.findMany()
        res.status(status.OK).json(closets)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const closet = await prisma.closet.findUnique({
            where: { id }
        })
        if(!closet) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `Closet with id ${id} doesn't exist`
            }
            throw err
        }
        res.status(status.OK).json(closet)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const { id, name, fk_room } = req.body
        const closet = await prisma.closet.update({
            where: { id },
            data: { id, name, fk_room }
        })
        res.status(status.OK).json(closet)
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/:id', async (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const closet = await prisma.closet.delete({
            where: {id}
        })
        res.status(status.OK).json(closet)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router