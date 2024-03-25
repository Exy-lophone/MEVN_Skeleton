const mongoose = require('mongoose')
const types = mongoose.Schema.Types

const closetSchema = new mongoose.Schema({
    name: {
        type: types.String,
        unique: true,
        required: true
    },
    room: {
        type: types.String,
        required: true
    }
});

module.exports = mongoose.model('Closet', closetSchema);