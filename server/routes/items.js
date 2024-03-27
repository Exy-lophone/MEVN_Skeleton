/*====================== IMPORTS =======================*/

require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkObject, makeCriteria, isNullUndefined, pattern_closet } = require('../utils/inputValidation')
const { throwError, throwErrorWhen, respondWithErr, errMsg } = require('../utils/errors')
const Closet = require('../models/closet')
const Item = require('../models/item')

/*====================== UTILS =======================*/

const createCriterias = [
    makeCriteria('description',true,"string"),
    makeCriteria('quantity',true,"number"),
    makeCriteria('category',true,"string"),
    makeCriteria('closet',true,"string",pattern_closet)
]

const updateCriterias = [
    makeCriteria('id',true,"string"),
    makeCriteria('description',false,"string"),
    makeCriteria('quantity',false,"number"),
    makeCriteria('category',false,"string"),
    makeCriteria('closet',false,"string",pattern_closet)
]

const copyAttrIfNotNull = (obj, attr, toCopy) => obj[attr] = isNullUndefined(toCopy[attr]) ? obj[attr] : toCopy[attr]

const multiStatusCode = (passed, failed, ok, bad) => passed.length > 0 ? failed.length > 0 ? status.STATUS_MULTI_STATUS : ok : bad

/*====================== QUERIES =======================*/

async function createItem (item) {
    const { description, quantity, category, closet: closetName } = item
    const closet = await getClosetByName(closetName)
    throwErrorWhen(closet, status.STATUS_NOTFOUND,errMsg.closetNotFound(closetName),x => isNullUndefined(x))
    const itemRecord = new Item({ description, quantity, category, closet })
    itemRecord.save()
    return itemRecord
}

async function getClosetByName (name) {
    return await Closet.findOne({ name })
}
async function getCloset (id) {
    return await Closet.findById(id)
}

async function getItem (id) {
    const itemRecord = await Item.findById(id)
    const closetRecord = await getCloset(itemRecord.closet)
    return ({
        "_id" : itemRecord._id,
        "description" : itemRecord.description,
        "quantity" : itemRecord.quantity,
        "category" : itemRecord.category,
        "closet" : closetRecord,
        "__v" : itemRecord.__v,
    })
}

async function updateItem (update) {
    const itemRecord = await Item.findById(update.id)
    copyAttrIfNotNull(itemRecord,"description",update)
    copyAttrIfNotNull(itemRecord,"quantity",update)
    copyAttrIfNotNull(itemRecord,"category",update)
    if(!isNullUndefined(update.closet)) itemRecord.closet = await Closet.findOne({name: update.closet})
    itemRecord.save()
    return itemRecord
}

async function deleteItem (id) {
    const itemRecord = await Item.findById(id)
    // throwErrorWhen(itemRecord,status.STATUS_NOTFOUND,`Item with id: ${id} don't exist`, )
    return result
}

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try {
        const item = req.body
        const result = checkObject(item, createCriterias)
        throwErrorWhen(result,status.STATUS_BAD_REQUEST,result,x => x.length > 0)
        const itemRecord = await createItem(item)
        res.status(status.STATUS_OK_CREATED).json(itemRecord)
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.post('/insertMany', async (req, res) => {
    try {
        const items = req.body
        throwErrorWhen(items,status.STATUS_BAD_REQUEST,"Request body must be an array of items",x => !Array.isArray(x))
        const parsed = items.map(x => ({item: x, err: checkObject(x, createCriterias)}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const itemRecords = await Promise.all(passed.map(x => createItem(x.item)))
        const statusCode = multiStatusCode(itemRecords,failed,status.STATUS_OK_CREATED,status.STATUS_BAD_REQUEST)
        res.status(statusCode).json({passed: itemRecords, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== READ =======================*/

router.get('/selectOne/:id', async (req, res) => {
    try {
        const itemRecord = await getItem(req.params.id)
        res.status(status.STATUS_OK).json(itemRecord)
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.get('/selectMany', async (req, res) => {
    try {
        const ids = req.body
        throwErrorWhen(ids,status.STATUS_BAD_REQUEST,"Body must be an array of item ids", x => !Array.isArray(x))
        const parsed = ids.map(x => ({id: x, err: typeof(x) === "string" ? [] : ['id must be a string']}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const itemRecords = await Promise.all(passed.map(x => getItem(x.id)))
        const statusCode = multiStatusCode(itemRecords, failed, status.STATUS_OK, status.STATUS_BAD_REQUEST)
        res.status(statusCode).json({passed: itemRecords, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.get('/:limit', async (req, res) => {
    try {
        const limit = parseInt(req.params.limit)
        throwErrorWhen(limit,status.STATUS_BAD_REQUEST,errMsg.expectedNbrOnReq("/items"),x => isNaN(x))
        const ids = (await Item.find({}, {_id: 1}).limit(limit)).map(x => x._id)
        const itemRecords = await Promise.all(ids.map(x => getItem(x)))
        res.status(status.STATUS_OK).json(itemRecords)
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/updateOne', async (req, res) => {
    try {
        const update = req.body
        const result = checkObject(update, updateCriterias)
        throwErrorWhen(result,status.STATUS_BAD_REQUEST,result,x => x.length > 0)
        const updatedRecord = await updateItem(update)
        res.status(status.STATUS_OK).json(updatedRecord)
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.patch('/updateMany', async (req, res) => {
    try {
        const updates = req.body
        throwErrorWhen(updates,status.STATUS_BAD_REQUEST,"Body must be array of items to update", x => !Array.isArray(x))
        const parsed = updates.map(x => ({update: x, err: checkObject(x,updateCriterias)}))
        const passed = parsed.filter(x => x.err.length === 0)
        const failed = parsed.filter(x => x.err.length > 0)
        const updatedRecords = await Promise.all(passed.map(x => updateItem(x.update)))
        res.status(multiStatusCode(updatedRecords,failed,status.STATUS_OK,status.STATUS_BAD_REQUEST)).json({passed: updatedRecords, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== DELETE =======================*/

router.delete('/deleteOne/:id', async (req, res) => {
    try {
        deleteItem(req.params.id)
        res.status(status.STATUS_OK_NOCONTENT)
    } catch (err) {
        respondWithErr(err, res)
    }
})
module.exports = router