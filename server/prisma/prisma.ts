import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import regex from '../src/utils/regex'
const RoomCreateInput = z.object({
    name: z.string().regex(regex.room)
})

const RoomUpdateInput = z.object({
    id: z.number(),
    name: z.string().regex(regex.room),
})

const ClosetCreateInput = z.object({
    name: z.string().regex(regex.closet),
    fk_room: z.number()
})

const ClosetUpdateInput = z.object({
    id: z.number(),
    name: z.string().regex(regex.closet).optional(),
    fk_room: z.number().optional()
})

const CategoryCreateInput = z.object({
    name: z.string()
})

const CategoryUpdateInput = z.object({
    id: z.number(),
    name: z.string()
})

const ItemCreateInput = z.object({
    description: z.string(),
    quantity: z.number(),
    fk_category: z.number(),
    fk_closet: z.number()
})

const ItemUpdateInput = z.object({
    id: z.number(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    fk_category: z.number().optional(),
    fk_closet: z.number().optional()
})

const prisma = new PrismaClient().$extends({
    query: {
        room: {
            create({args,query}) {
                args.data = RoomCreateInput.parse(args.data)
                return query(args)
            },
            update({args,query}) {
                args.data = RoomUpdateInput.parse(args.data)
                return query(args)
            }
        },
        closet: {
            create({args,query}) {
                args.data = ClosetCreateInput.parse(args.data)
                return query(args)
            },
            update({args,query}) {
                args.data = ClosetUpdateInput.parse(args.data)
                return query(args)
            }
        },
        category: {
            create({args,query}) {
                args.data = CategoryCreateInput.parse(args.data)
                return query(args)
            },
            update({args,query}) {
                args.data = CategoryUpdateInput.parse(args.data)
                return query(args)
            }
        },
        item: {
            create({args,query}) {
                args.data = ItemCreateInput.parse(args.data)
                return query(args)
            },
            update({args,query}) {
                args.data = ItemUpdateInput.parse(args.data)
                return query(args)
            }
        }
    }
})

export default prisma