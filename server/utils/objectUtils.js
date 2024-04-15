const { isNullUndefined } = require('./inputValidation')

const copyAttrIfNotNull = (obj, attr, toCopy) => obj[attr] = isNullUndefined(toCopy[attr]) ? obj[attr] : toCopy[attr]

module.exports = {
    copyAttrIfNotNull
}