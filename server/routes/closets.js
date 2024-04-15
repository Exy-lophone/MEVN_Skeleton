/*====================== IMPORTS =======================*/

require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { multiStatusCode } = require('../utils/httpResStatusCodes')
const { checkObject, pattern_closet, pattern_room, makeCriteria, isNullUndefined } = require('../utils/inputValidation')
const { throwErrorWhen, respondWithErr, errMsg } = require('../utils/errors')
const { copyAttrIfNotNull } = require('../utils/objectUtils')
const Closet = require('../models/closet')
const Item = require('../models/item')

/*====================== UTILS =======================*/

const closetCriterias = [
    makeCriteria("name",true,"string",pattern_closet),
    makeCriteria("room",true,"string",pattern_room)
]

const updateCriterias = [
    makeCriteria("id",true,"string"),
    makeCriteria("name",false,"string",pattern_closet),
    makeCriteria("room",false,"string",pattern_room)
]

/*====================== QUERIES =======================*/

async function createCloset (name, room) {
    const closetRecord = new Closet({name, room})
    await closetRecord.save()
    return closetRecord
}

async function getCloset (id) {
    return await Closet.findById(id)
}

async function getItemByCloset(id) {
    return await Item.find({closet: id})
}

async function updateCloset (update) {
    const closetRecord = await Closet.findById(update.id)
    copyAttrIfNotNull(closetRecord,"name",update)
    copyAttrIfNotNull(closetRecord,"room",update)
    closetRecord.save()
    return closetRecord
}

async function deleteCloset(id) {
    await Closet.deleteOne({_id: id})
}

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try{
        const closet = req.body
        const errors = checkObject(closet,closetCriterias)
        throwErrorWhen(errors, status.STATUS_BAD_REQUEST, errors, x => errors.length > 0)
        const closetRecord = await createCloset(closet.name, closet.room)
        res.status(status.STATUS_OK_CREATED).json({closetRecord})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.post('/insertMany', async (req, res) => {
    try{
        const closets = req.body
        throwErrorWhen(closets, status.STATUS_BAD_REQUEST, "Request body must be an array of closets", x => !Array.isArray(x))
        const parsed = closets.map(x => ({closet: x, err: checkObject(x,closetCriterias)}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const closetRecords = await Promise.all(passed.map(x => createCloset(x.closet.name, x.closet.room)))
        res.status(multiStatusCode(passed,failed,status.STATUS_OK_CREATED,status.STATUS_BAD_REQUEST)).json({passed: closetRecords, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== READ =======================*/

router.get('/selectOne/:id', async (req, res) => {
    try {
        const closetRecord = await getCloset(req.params.id)
        res.status(status.STATUS_OK).json(closetRecord)
    } catch (err) {
        respondWithErr(err,res)
    }
})

router.get('/selectMany', async (req, res) => {
    try {
        const ids = req.body
        throwErrorWhen(ids,status.STATUS_BAD_REQUEST,"Body must be an array of closets id", x => !Array.isArray(x))
        const parsed = ids.map(x => ({id:x, err: typeof(x) === "string" ? [] : ['id must be a string']}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const closetsRecords = await Promise.all(passed.map(x => getCloset(x.id)))
        const statusCode = multiStatusCode(passed,failed,status.STATUS_OK,status.STATUS_BAD_REQUEST) 
        res.status(statusCode).json({passed:closetsRecords,failed})
    } catch (err) {
        respondWithErr(err,res)
    }
})

router.get('/:limit', async (req, res) => {
    const limit = parseInt(req.params.limit)
    throwErrorWhen(limit,status.STATUS_BAD_REQUEST,"limit should be a number", isNaN)
    const closetRecords = await Closet.find({}).limit(limit)
    res.status(status.STATUS_OK).json({closets: closetRecords})
})

/*====================== UPDATE =======================*/

router.patch('/updateOne', async (req, res) => {
    try {
        const update = req.body
        const errors = checkObject(update,updateCriterias)
        throwErrorWhen(errors,status.STATUS_BAD_REQUEST,errors,x => x.length > 0)
        const updatedRecord = await updateCloset(update)
        res.status(status.STATUS_OK).json(updatedRecord)
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.patch('/updateMany', async (req, res) => {
    try {
        const updates = req.body
        throwErrorWhen(updates,status.STATUS_BAD_REQUEST,"Body must be an array of closet to update", x => !Array.isArray(x))
        const parsed = updates.map(x => ({update: x, err: checkObject(x,updateCriterias)}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const updatedRecords = await Promise.all(passed.map(x => updateCloset(x.update)))
        const statusCode = multiStatusCode(passed,failed,status.STATUS_OK,status.STATUS_BAD_REQUEST)
        res.status(statusCode).json({passed:updatedRecords,failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== DELETE =======================*/

router.delete('/deleteOne/:id', async (req, res) => {
    try {
        const id = req.params.id
        throwErrorWhen(id,status.STATUS_BAD_REQUEST,"Id must be a string", x => typeof(x) !== "string")
        const itemRecords = await getItemByCloset(id)
        throwErrorWhen(itemRecords,status.STATUS_BAD_REQUEST,"Can't delete closet when that contains items",x => x.length > 0)
        await deleteCloset(id)
        res.status(status.STATUS_OK_NOCONTENT)
    } catch (err) {
        respondWithErr(err, res)
    }
})

module.exports = router