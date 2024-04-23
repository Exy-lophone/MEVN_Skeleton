import express from "express"
import Item from "../models/item"
import type { ItemType } from "../models/item"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
const { resWithErr, throwWhen } = errorUtils

const router = express.Router()

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {

    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== READ =======================*/

router.get('/', async (req,res) => {
    try {
        const items = await Item.where().populate('closet')
        throwWhen(1,status.BAD_REQUEST,"ErrorStatus is an Error !", x => x === 1)
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const items = await Item.findById(id).populate('closet')
        res.status(200).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router