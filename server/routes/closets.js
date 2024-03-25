require('dotenv').config()
const Closet = require('../models/closet')
const express = require('express')
const router = express.Router()
const status = require('../utils/httpResStatusCodes')
const { checkPattern, pattern_closet, pattern_room } = require('../utils/inputValidation')
const { throwError, respondWithErr, errMsg } = require('../utils/errors')

/*====================== CREATE =======================*/

router.post('/insertOne', async (req, res) => {
    try{
        const { room, closet } = req.body
        if(!room) throwError(status.STATUS_BAD_REQUEST,"Room is required")
        if(!closet) throwError(status.STATUS_BAD_REQUEST,"Closet is required")
        if(!checkPattern(closet, pattern_closet)) throwError(status.STATUS_BAD_REQUEST,errMsg.closet)
        if(!checkPattern(room, pattern_room)) throwError(status.STATUS_BAD_REQUEST,errMsg.room)
        const closetRecord = new Closet({name:closet, room})
        await closetRecord.save()
        res.status(status.STATUS_OK_CREATED).json({addedRecord:closetRecord})
    } catch (err) {
        respondWithErr(err, res)
    }
})

module.exports = router