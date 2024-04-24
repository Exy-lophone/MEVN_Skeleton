/*===================== IMPORTS ======================*/

import express from "express"
import Closet from "../models/closet"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import promiseUtils from "../utils/promiseUtils"
import { z } from "zod"
import type { ErrorStatus } from "../utils/errorUtils"

/*====================== UTILS =======================*/

const router = express.Router()
const { resWithErr, throwErrStatus, throwWhen } = errorUtils
const { isFulfilled, isRejected } = promiseUtils

const createSchema = z.object({
    name: z.string(),
    room: z.string()
})

const updateSchema = z.object({
    name: z.string().optional(),
    room: z.string().optional()
})

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {

    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/:limit', async (req,res) => {
    try {
        const limit = z.coerce.number().parse(req.params.limit)
        const closets = await Closet.find().limit(limit)
        res.status(status.OK).json(closets)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const closet = await Closet.findById(id)
        if(!closet) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `item with id ${id} don't exist`
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

    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/', async (req, res) => {
    try {

    } catch (err) {
        resWithErr(err, res)
    }
})

export default router