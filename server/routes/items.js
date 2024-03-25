require('dotenv').config()
const Closet = require('../models/closet')
const Item = require('../models/item')
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkPattern, pattern_closet } = require('../utils/inputValidation')
const { throwError, respondWithErr, errMsg } = require('../utils/errors')

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try {
        const { description, quantity, category, closet: closetName } = req.body
        if(!description) throwError(status.STATUS_BAD_REQUEST,"Description is required")
        if(!quantity) throwError(status.STATUS_BAD_REQUEST,"Quantity is required")
        if(!category) throwError(status.STATUS_BAD_REQUEST,"Category is required")
        if(!closetName) throwError(status.STATUS_BAD_REQUEST,"Closet is required")
        if(!checkPattern(closetName, pattern_closet)) throwError(status.STATUS_BAD_REQUEST, errMsg.closet)
        const closet = await Closet.findOne({name: closetName})
        if(!closet) throwError(status.STATUS_NOTFOUND, errMsg.closetNotFound(closetName))
        const item = new Item({description,quantity,category,closet: closet._id})
        await item.save()
        res.status(status.STATUS_OK_CREATED).json({addedRecords:items})
    } catch (err) {
        respondWithErr(err, res)
    }
})

router.post('/insertMany', async (req, res) => {
    try {
        const items = req.body
        if(!Array.isArray(items)) throwError(status.STATUS_BAD_REQUEST, "Body must be an array of items to insert !")
        const itemRecords = Array(items.length)
        for(let i = 0; i < items.length; i++){
            const item = items[i]
            if(!item.description) throwError(status.STATUS_BAD_REQUEST,"Description is required")
            if(!item.quantity) throwError(status.STATUS_BAD_REQUEST,"Quantity is required")
            if(!item.category) throwError(status.STATUS_BAD_REQUEST,"Category is required")
            if(!item.closet) throwError(status.STATUS_BAD_REQUEST,"Closet is required")
            if(!checkPattern(item.closet, pattern_closet)) throwError(status.STATUS_BAD_REQUEST, errMsg.closet)
            const closet = await Closet.findOne({name: item.closet})
            if(!closet) throwError(status.STATUS_NOTFOUND, errMsg.closetNotFound(item.closet))
            itemRecords.push(new Item({description,quantity,category,closet: closet._id}))
        }
        for(let i = 0; i < items.length; i++){
            await itemRecords[i].save()
        }
    } catch (err) {
        respondWithErr(err, res)
    }
})

module.exports = router