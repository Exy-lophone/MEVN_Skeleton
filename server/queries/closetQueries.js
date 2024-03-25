const Closet = require('../models/closet')

const findOneByName = async name => await Closet.findOne({name})

module.exports = {
    findOneByName,
}