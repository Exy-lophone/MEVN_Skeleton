/*===================== IMPORTS ======================*/

import prisma from "../../prisma/prisma"
import express from "express"
import status from "../utils/httpStatusCode"
import errorUtils from "../utils/errorUtils"
import { z } from "zod"
import type { ErrorStatus } from "../utils/errorUtils"
import { Prisma } from "@prisma/client"
import regex from "../utils/regex"

/*====================== UTILS =======================*/

const router = express.Router()
const { resWithErr } = errorUtils

/*============================================ ROUTES =============================================*/

/*====================== CREATE =======================*/

router.post('/', async (req, res) => {
    try {
        const {description,quantity,fk_category,fk_closet} = req.body
        const item = await prisma.item.create({
            select: {
                id: true,
                description: true,
                quantity: true,
                category: true,
                closet: {
                    select: {
                        id: true,
                        name: true,
                        room: true,
                    }
                },
            },
            data: {description,quantity,fk_category,fk_closet}
        })
        res.status(status.OK_CREATED).json(item)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*======================= READ ========================*/

const OptionsFindInput = z.object({
    research: z.string().optional(),
    sort: z.union([
        z.literal('description'),
        z.literal('quantity'),
        z.literal('category'),
        z.literal('closet'),
        z.literal('room')
    ]),
    order: z.union([z.literal('asc'),z.literal('desc')]),
    room: z.string().regex(regex.room).optional(),
    closet: z.string().regex(regex.closet).optional()
})

router.post('/options', async (req, res) => {
    try {
        const { research, sort, order, room, closet } = OptionsFindInput.parse(req.body)

        const query: Prisma.ItemFindManyArgs = {
            select: {
                id: true,
                description: true,
                quantity: true,
                category: true,
                closet: {
                    select: {
                        id: true,
                        name: true,
                        room: true,
                    }
                },
            },
            where: {
                description: {
                    contains: research
                },
                closet: {
                    name: closet,
                    room: {
                        name: room
                    }
                }
            }
        }

        if(sort === 'closet' || sort === 'room' || sort === 'category') {
            query['orderBy'] = { 
                [sort]: { name: order }    
            }
        } else {
            query['orderBy'] = { [sort]: order }
        }

        const items = await prisma.item.findMany(query)
        
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/', async (req,res) => {
    try {
        const items = await prisma.item.findMany({
            select: {
                id: true,
                description: true,
                quantity: true,
                category: true,
                closet: {
                    select: {
                        id: true,
                        name: true,
                        room: true,
                    }
                },
            },
        })
        res.status(status.OK).json(items)
    } catch (err) {
        resWithErr(err, res)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const item = await prisma.item.findUnique({
            where: {id},
            select: {
                id: true,
                description: true,
                quantity: true,
                category: true,
                closet: {
                    select: {
                        id: true,
                        name: true,
                        room: true,
                    }
                },
            },
        })
        if(!item) {
            const err: ErrorStatus = {
                status: status.BAD_REQUEST,
                message: `Item with id ${id} doesn't exist !`
            }
            throw err
        }
        res.status(status.OK).json(item)
    } catch (err) {
        resWithErr(err, res)
    }
})

/*====================== UPDATE =======================*/

router.patch('/', async (req, res) => {
    try {
        const {id,description,quantity,fk_category,fk_closet} = req.body
        const item = await prisma.item.update({
            where: {id},
            data: {id,description,quantity,fk_category,fk_closet},
            select: {
                id: true,
                description: true,
                quantity: true,
                category: true,
                closet: {
                    select: {
                        id: true,
                        name: true,
                        room: true,
                    }
                },
            },
        })
        res.status(status.OK).json(item)
    } catch (err) {
        resWithErr(err,res)
    }
})

/*====================== DELETE =======================*/

router.delete('/:id', async (req, res) => {
    try {
        const id = z.coerce.number().parse(req.params.id)
        const item = await prisma.item.delete({
            where: {id}
        })
        res.status(status.OK).json(item)
    } catch (err) {
        resWithErr(err, res)
    }
})

export default router