const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const itemSchema = new mongoose.Schema({
    description: {
        type: types.String,
        required: true
    },
    quantity: {
        type: types.Number,
        required: true
    },
    category: {
        type: types.String,
        required: true
    },
    closet: {
        type: types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema);