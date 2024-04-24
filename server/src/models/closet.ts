import mongoose from 'mongoose'
const types = mongoose.Schema.Types

const closetSchema = new mongoose.Schema({
    name: {
        type: types.String,
        unique: true,
        required: true,
        validate: {
            validator: (x: string) => x.match(/^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/),
            message: "Name don't match the pattern /^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/"
        }
    },
    room: {
        type: types.String,
        required: true,
        validate: {
            validator: (x: string) => x.match(/^[A-C][0-9]{2}$/),
            message: "Name don't match the pattern /^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/"
        }
    }
});

export default mongoose.model('Closet', closetSchema);