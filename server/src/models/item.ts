/*===================== IMPORTS ======================*/

import mongoose from 'mongoose'
import Closet from './closet'
import { ObjectId } from 'mongodb';
const types = mongoose.Schema.Types

/*===================== SCHEMA ======================*/

const itemSchema = new mongoose.Schema({
    description: {
        type: types.String,
        required: true
    },
    quantity: {
        type: types.Number,
        required: true,
    },
    category: {
        type: types.String,
        required: true
    },
    closet: {
        type: types.ObjectId,
        required: true,
        ref: Closet,
        validate: {
            validator: async (id: ObjectId) => {
                const closet = await Closet.find({_id:id})
                return closet.length > 0
            },
            message: (props: any) => `${props.value} isn't a closet object id` 
        }
    }
});

/*=================== MIDDLEWARES ====================*/
itemSchema.pre('save', async function(next) {
    
})

export default mongoose.model('Item', itemSchema);