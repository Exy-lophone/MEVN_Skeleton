/*====================== IMPORTS =======================*/

require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { multiStatusCode } = require('../utils/httpResStatusCodes')
const { checkObject, makeCriteria, isNullUndefined, pattern_closet } = require('../utils/inputValidation')
const { throwErrorWhen, respondWithErr, errMsg } = require('../utils/errors')
const { copyAttrIfNotNull } = require('../utils/objectUtils')
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
    throwErrorWhen(itemRecord,status.STATUS_NOTFOUND,`Item with id: ObjectId(${id}) don't exist`, x => isNullUndefined(x))
    await Item.deleteOne({_id:itemRecord._id})
}

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
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

router.get('/', async (req, res) => {
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

router.get('/:limit-:sortBy-:orderBy-:roomFilter-:closetFilter-:research?', async (req, res) => {
    try {
        const { limit, sortBy, orderBy, roomFilter, closetFilter, research} = req.params
        throwErrorWhen(limit,status.STATUS_BAD_REQUEST,errMsg.expectedNbrOnReq("/items"),x => isNaN(x))
        const aggregation = []
        aggregation.push({$lookup: {from:"closets",localField:"closet",foreignField:"_id", as:"closet"}})
        aggregation.push({ $unwind : "$closet" })
        if(roomFilter !== 'none') {
            aggregation.push(
                {$match: {"closet.room": roomFilter}}
            )
        }
        if(closetFilter !== 'none') {
            aggregation.push(
                {$match: {"closet.name": closetFilter}}
            )
        }
        if(research) {
            aggregation.push(
                {$match: { description: new RegExp(research,"i") }}
            )
        }
        aggregation.push({$sort: {[sortBy]: orderBy === 'descending' ? -1 : 1}})
        const itemRecords = await Item.aggregate(aggregation)
        res.status(status.STATUS_OK).json(itemRecords)
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
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

router.delete('/', async (req, res) => {
    try {
        const ids = req.body
        throwErrorWhen(ids, status.STATUS_BAD_REQUEST, "Body must be an array of items id to delete", x => !Array.isArray(x))
        const passed = ids.filter(x => typeof(x) === "string")
        const failed = ids.filter(x => typeof(x) !== "string")
        await Promise.all(passed.map(deleteItem))
        res.status(multiStatusCode(passed,failed,status.STATUS_OK,status.STATUS_BAD_REQUEST)).json({passed,failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})
module.exports = router