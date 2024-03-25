const status = require('./httpResStatusCodes')

const errMsg = {
    closet: "Closet is invalid (must be INF-{Room}-ARM{closet number}, example:'INF-B01-ARM1')",
    room: "Room is invalid (Correct example: 'A01', 'B11')",
    closetNotFound: closetName => `${closetName} does not exist in database`
}

/**
 * 
 * @param {Number} statusCode - HTTP Response status code
 * @param {*} msg - Error message
 */
const throwError = (statusCode, msg) => {
    err = new Error(msg)
    err.statusCode = statusCode
    throw err
}

/**
 * 
 * @param {Error} err
 * @param {Response} res 
 */
const respondWithErr = (err, res) => {
    if(!err.statusCode) err.statusCode = status.STATUS_INTERNALERR
    res.status(err.statusCode).json({error: err.message})
}

module.exports = { throwError, respondWithErr, errMsg }