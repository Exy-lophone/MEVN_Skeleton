require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkObject, makeCriteria, isNullUndefined, pattern_closet } = require('../utils/inputValidation')
const { throwError, throwErrorWhenNullUndef, throwErrorWhenNaN, respondWithErr, errMsg } = require('../utils/errors')

const Closet = require('../models/closet')
const Item = require('../models/item')
const closet = require('../models/closet')

const itemCriterias = [
    makeCriteria('description',true,"string"),
    makeCriteria('quantity',true,"number"),
    makeCriteria('category',true,"string"),
    makeCriteria('closet',true,"string",pattern_closet)
]

const itemUpdateCriterias = [
    makeCriteria('description',false,"string"),
    makeCriteria('quantity',false,"number"),
    makeCriteria('category',false,"string"),
    makeCriteria('closet',false,"string",pattern_closet)
]

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try {
        const item = req.body
        const result = checkObject(item, itemCriterias)
        if(result.length > 0) throwError(status.STATUS_BAD_REQUEST,result)
        const { description, quantity, category, closet: closetName } = item
        const closet = await closetQueries.findOneByName(closetName)
        throwErrorWhenNullUndef(closet, status.STATUS_NOTFOUND, errMsg.closetNotFound(closetName))
        itemQueries.insertItem(description,quantity,category,closet._id)
        res.status(status.STATUS_OK_CREATED).json({addedRecords:item})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.post('/insertMany', async (req, res) => {
    try {
        const items = req.body
        if(!Array.isArray(items)) throwError(status.STATUS_BAD_REQUEST, "Request body must be an array of items")
        const parsedItem = items.map(x => ({item: x, err: checkObject(x,itemCriterias)}))
        const failed = parsedItem.filter(x => x.err.length > 0)
        const passed = parsedItem.filter(x => x.err.length === 0)
        const passedWithClosetId = await Promise.all(passed.map(async x => {
            const closet = await Closet.findOne({name: x.item.closet})
            throwErrorWhenNullUndef(closet,status.STATUS_BAD_REQUEST,errMsg.closetNotFound(x.item.closet))
            x.item.closet = closet._id
            return x
        }))
        const itemRecords = await Promise.all(passedWithClosetId.map(async x => {
            const description = x.item.description
            const quantity = x.item.quantity
            const category = x.item.category
            const closet = x.item.closet
            const itemRecord = new Item({description,quantity,category,closet})
            await itemRecord.save()
            return itemRecord
        }))
        const statusCode = itemRecords.length > 0 ? failed.length > 0 ? status.STATUS_MULTI_STATUS : status.STATUS_OK_CREATED : status.STATUS_BAD_REQUEST
        res.status(statusCode).json({passed: passedWithClosetId, failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== READ =======================*/

router.get('/id/:id', async (req, res) => {
    try {
        const itemRecord = await Item.findById(req.params.id)
        const description = itemRecord.description
        const quantity = itemRecord.quantity
        const category = itemRecord.category
        const closet = await Closet.findById(itemRecord.closet)
        res.status(status.STATUS_OK).json({description,quantity,category,closet})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.get('/:limit', async (req, res) => {
    try {
        const limit = parseInt(req.params.limit)
        throwErrorWhenNaN(limit,status.STATUS_BAD_REQUEST,errMsg.expectedNbrOnReq("/items"))
        const itemRecords = await Item.find({}).limit(limit)
        const itemRecordsWithClosets = await Promise.all(itemRecords.map(async x => {
            const description = x.description
            const quantity = x.quantity
            const category = x.category
            const closet = await Closet.findById(x.closet)
            return ({description,quantity,category,closet})
        }))
        res.status(status.STATUS_OK).json(itemRecordsWithClosets)
    } catch (err) {
        respondWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/id/:id', async (req, res) => {
    try {
        const updatedValues = req.body
        const result = checkObject(updatedValues, itemUpdateCriterias)
        if(result.length > 0) throwError(status.STATUS_BAD_REQUEST, result)
        const itemRecord = await Item.findById(req.params.id)
        itemRecord.description = isNullUndefined(updatedValues.description) ? itemRecord.description : updatedValues.description
        itemRecord.quantity = isNullUndefined(updatedValues.quantity) ? itemRecord.quantity : updatedValues.quantity
        itemRecord.category = isNullUndefined(updatedValues.category) ? itemRecord.category : updatedValues.category
        if(!isNullUndefined(updatedValues.closet)) {
            const closet = await Closet.findOne({name: updatedValues.closet})
            console.log(closet)
            throwErrorWhenNullUndef(closet,status.STATUS_BAD_REQUEST,errMsg.closetNotFound(updatedValues.closet))
            itemRecord.closet = closet
        }
        await itemRecord.save()
        res.status(status.STATUS_OK).json({UpdatedItem: itemRecord})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.patch('/update', async (req, res) => {

})

module.exports = router