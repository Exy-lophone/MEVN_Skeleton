import mongoose from 'mongoose'
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

export default mongoose.model('Closet', closetSchema);