/*===================== IMPORTS ======================*/

import express from "express"
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
    description: z.string(),
    quantity: z.number(),
    category: z.string(),
    closet: z.string()
})

const updateSchema = z.object({
    _id: z.string(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    category: z.string().optional(),
    closet: z.string().optional()
})

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {
        const parsedBody = createSchema.array().parse(req.body)
        const settledPromise = await Promise.allSettled(parsedBody.map(async x => {
            await new Item(x).validate()
            return x
        }))
        const passed = settledPromise.filter(isFulfilled).map(x => x.value)
        const failed = settledPromise.filter(isRejected)
        await Item.create(passed)
        res.status(failed.length > 0 ? status.MULTI_STATUS : status.OK).json({failed})
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/limit/:limit', async (req,res) => {
    try {
        const limit = z.coerce.number().parse(req.params.limit)
        const items = await Item.where().populate('closet').limit(limit)
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const item = await Item.findById(id).populate('closet')
        if(!item) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `item with id ${id} don't exist`
            }

            throw err
        }
        res.status(status.OK).json(item)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const parsedBody = updateSchema.array().parse(req.body)
        const settledItems = await Promise.allSettled(parsedBody.map(async x => {
            const itemRecord = await Item.findById({_id:x._id})
            if(!itemRecord) {
                const err: ErrorStatus = {
                    status: status.BAD_REQUEST,
                    message: `item with id ${x._id} don't exist`
                }
                throw err
            }
            return x
        }))

        const failed = settledItems.filter(isRejected)
        const passed = settledItems.filter(isFulfilled)

        const settledUpdates = await Promise.allSettled(passed.map(async x => {
            const updates = x.value
            await Item.updateOne({_id:updates._id},updates,{ runValidators: true })
        }))

        failed.push(...settledUpdates.filter(isRejected))
        res.status(failed.length > 0 ? status.MULTI_STATUS : status.OK).json({failed})
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/', async (req, res) => {
    try {
        const ids = z.array(z.string()).parse(req.body)
        const settledDelete = await Promise.allSettled(ids.map(async x => {
            if(!await Item.exists({_id:x})) {
                const err: ErrorStatus = {
                    status: 400,
                    message: `item with id ${x} don't exist`
                }

                throw err
            }

            await Item.deleteOne({_id:x})
        }))

        const failed = settledDelete.filter(isRejected)

        res.status(failed.length > 0 ? status.MULTI_STATUS : status.OK).json({failed})
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router