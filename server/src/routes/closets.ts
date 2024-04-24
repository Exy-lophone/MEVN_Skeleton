/*===================== IMPORTS ======================*/

import express from "express"
import Closet from "../models/closet"
import Item from "../models/item"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import promiseUtils from "../utils/promiseUtils"
import { z } from "zod"
import type { ErrorStatus } from "../utils/errorUtils"

/*====================== UTILS =======================*/

const router = express.Router()
const { resWithErr } = errorUtils
const { isFulfilled, isRejected } = promiseUtils

const createSchema = z.object({
    name: z.string(),
    room: z.string()
})

const updateSchema = z.object({
    _id: z.string(),
    name: z.string().optional(),
    room: z.string().optional()
})

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {
        const parsedBody = createSchema.array().nonempty().parse(req.body)
        const settledClosets = await Promise.allSettled(parsedBody.map(async x => {
            await new Closet(x).validate()
            return x
        }))
        const passed = settledClosets.filter(isFulfilled).map(x => x.value)
        const failed = settledClosets.filter(isRejected)
        await Closet.create(passed)
        res.status(failed.length > 0 ? status.MULTI_STATUS : status.OK).json({failed})
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/limit/:limit', async (req,res) => {
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
        const parsedBody = updateSchema.array().nonempty().parse(req.body)
        const settledClosets = await Promise.allSettled(parsedBody.map(async x => {
            if(!await Closet.exists({_id:x._id})) {
                const err: ErrorStatus = {
                    status: status.BAD_REQUEST,
                    message: `item with id ${x._id} don't exist`
                }

                throw err
            }
            return x
        }))

        const passed = settledClosets.filter(isFulfilled)
        const failed = settledClosets.filter(isRejected)

        const settledUpdates = await Promise.allSettled(passed.map(async x => {
            const updates = x.value
            await Closet.updateOne({_id:updates._id},updates,{ runValidators: true })
        }))

        failed.push(...settledUpdates.filter(isRejected))

        res.status(failed.length > 0 ? status.MULTI_STATUS : status.OK).json({failed})
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const items = await Item.find({closet:id})
        if(items.length > 0) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: "Can't delete closet containing items !"
            }

            throw err
        }
        await Closet.deleteOne({_id:id})
        res.status(status.OK_NOCONTENT)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router