require('dotenv').config()
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkObject, makeCriteria, pattern_closet } = require('../utils/inputValidation')
const { throwError, throwErrorWhenNullUndef, respondWithErr, errMsg } = require('../utils/errors')
const itemQueries = require('../queries/itemQueries')
const closetQueries = require('../queries/closetQueries')

const itemCriterias = [
    makeCriteria('description',true,"string"),
    makeCriteria('quantity',true,"number"),
    makeCriteria('category',true,"string"),
    makeCriteria('closet',true,"string",pattern_closet)
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
        const parsedItem = items.reduce((acc, elem) => [...acc, {item: elem, err: checkObject(elem,itemCriterias)}], [])
        const failed = parsedItem.filter(x => x.err.length > 0)
        const passed = parsedItem.filter(x => x.err.length === 0)
        const passedWithClosetId = await Promise.all(passed.map(async x => {
            const closet = await closetQueries.findOneByName(x.item.closet)
            x.item.closet = closet._id
            return x
        }))
        await Promise.all(passedWithClosetId.map(x => itemQueries.insertItem(x.item.description,x.item.quantity,x.item.category,x.item.closet)))
        res.status(status.STATUS_OK_CREATED).json({failed})
    } catch (err) {
        respondWithErr(err, res)
    }
})

module.exports = router