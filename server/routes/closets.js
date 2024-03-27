require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkObject, pattern_closet, pattern_room, makeCriteria } = require('../utils/inputValidation')
const { throwError, respondWithErr, errMsg, throwErrorWhenNaN } = require('../utils/errors')

const Closet = require('../models/closet')

const closetCriterias = [
    makeCriteria("name",true,"string",pattern_closet),
    makeCriteria("room",true,"string",pattern_room)
]

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try{
        const closet = req.body
        const errMsgs = checkObject(closet,closetCriterias)
        if(errMsgs.length > 0) throwError(status.STATUS_BAD_REQUEST, errMsgs)
        const name = closet.name
        const room = closet.room
        const closetRecord = new Closet({name, room})
        await closetRecord.save()
        res.status(status.STATUS_OK_CREATED).json({passed:closetRecord})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.post('/insertMany', async (req, res) => {
    try{
        const closets = req.body
        if(!Array.isArray(closets)) throwError(status.STATUS_BAD_REQUEST, "Request body must be an array of closets")
        const parsedClosets = closets.map(x => ({closet: x, err: checkObject(x,closetCriterias)}))
        const passed = parsedClosets.filter(x => x.err.length === 0)
        const failed = parsedClosets.filter(x => x.err.length > 0)
        const closetRecords = await Promise.all(passed.map(async x => {
            const name = x.closet.name
            const room = x.closet.room
            const closetRecord = new Closet({name, room})
            await closetRecord.save()
            return closetRecord
        }))
        const statusCode = closetRecords.length > 0 ? failed.length > 0 ? status.STATUS_MULTI_STATUS : status.STATUS_OK_CREATED : status.STATUS_BAD_REQUEST
        res.status(statusCode).json({passed: closetRecords, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== READ =======================*/

router.get('/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit)
    throwErrorWhenNaN(limit)
    const closetRecords = await Closet.find({}).limit(limit)
    res.status(status.STATUS_OK).json({closets: closetRecords})
})

module.exports = router