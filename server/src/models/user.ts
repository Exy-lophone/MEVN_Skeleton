import mongoose from 'mongoose'
const types = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    username: {
        type: types.String,
        unique: true,
        required: true
    },
    password: {
        type: types.String,
        required: true
    }
})

export default mongoose.model('User', userSchema)