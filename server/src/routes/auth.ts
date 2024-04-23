import express from "express"
import User from "../models/user"

const router = express.Router()

router.get('/', async (req,res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error:err})
    }
})

export default router