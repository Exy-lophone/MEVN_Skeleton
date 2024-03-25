const Item = require('../models/item')

const insertItem = async (description, quantity, category, closet) => {
    const item = new Item({description,quantity,category,closet})
    await item.save()
}

module.exports = {
    insertItem
}