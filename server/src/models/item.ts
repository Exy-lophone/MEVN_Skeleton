import mongoose from 'mongoose'
import Closet from './closet'
import { z } from 'zod'

const types = mongoose.Schema.Types

type ItemType = {
    description: string,
    quantity: number,
    category: string,
    closet: string
}

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
        required: true,
        ref: Closet
    }
});

export type {
    ItemType
}
export default mongoose.model('Item', itemSchema);