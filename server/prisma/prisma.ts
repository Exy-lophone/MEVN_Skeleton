import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const roomRegex = /^[A-C][0-9]{2}$/
const closetRegex = /^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/

const RoomCreateInput = z.object({
    name: z.string().regex(roomRegex)
})

const RoomUpdateInput = z.object({
    id: z.number(),
    name: z.string().regex(roomRegex),
})

const ClosetCreateInput = z.object({
    name: z.string().regex(closetRegex),
    fk_room: z.number()
})

const ClosetUpdateInput = z.object({
    id: z.number(),
    name: z.string().regex(closetRegex).optional(),
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