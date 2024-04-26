/*===================== IMPORTS ======================*/

import express from "express"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import prisma from "../../prisma/prisma"
import { z } from "zod"
import type { ErrorStatus } from "../utils/errorUtils"
const router = express.Router()
const { resWithErr } = errorUtils

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {
        const { name } = req.body
        const category = await prisma.category.create({
            data: { name }
        })
        res.status(status.OK_CREATED).json(category)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/', async (req,res) => {
    try {
        const categories = await prisma.category.findMany()
        res.status(status.OK).json(categories)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const category = await prisma.category.findUnique({
            where: {id}
        })
        if(!category){
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `Category with id ${id} doesn't exist !`
            }
            throw err
        }
        res.status(status.OK).json(category)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const { id, name } = req.body
        const category = await prisma.category.update({
            where: {id},
            data: { id, name }
        })
        res.status(status.OK).json(category)
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/:id', async (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const category = await prisma.category.delete({
            where: {id}
        })
        res.status(status.OK).json(category)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router