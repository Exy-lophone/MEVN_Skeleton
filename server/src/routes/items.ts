/*===================== IMPORTS ======================*/

import express from "express"
import Item from "../models/item"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import { z } from "zod"
const { resWithErr, throwWhen } = errorUtils

/*====================== UTILS =======================*/

const router = express.Router()

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

const isFulfilled = <T>(p:PromiseSettledResult<T>): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';
const isRejected = <T>(p:PromiseSettledResult<T>): p is PromiseRejectedResult => p.status === 'rejected';

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
        res.status(status.OK_CREATED).json({failed})
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

router.get('/:limit', async (req,res) => {
    try {
        const limit = z.number().parse(req.params.limit)
        const items = await Item.where().populate('closet').limit(limit)
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const items = await Item.findById(id).populate('closet')
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const parsedBody = updateSchema.parse(req.body)
        res.status(status.OK)
    } catch (err) {
        resWithErr(err,res)
    }
})
export default router