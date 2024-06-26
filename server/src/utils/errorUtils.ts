import type { Response } from 'express'
import type { HttpStatusCode } from './httpStatusCode'

type ErrorStatus = {
    status: HttpStatusCode
    message: string
}

type predicate<T> = (x: T) => boolean

function throwErrStatus(message: string, status: HttpStatusCode) {
    const err: ErrorStatus = {
        message: message,
        status
    }

    throw err
}

function throwWhen<T> (value: T, status: HttpStatusCode, msg: string, condition: predicate<T>) {
    if(!condition(value)) return
    throwErrStatus(msg,status)
}

function resWithErr(err: unknown, res: Response) {
    if(!err || typeof err !== "object") {
        console.log('[resWithErr] not a valid error') 
        return
    }
    if(err instanceof Error) {
        console.error(err.message)
        res.status(500).json({error:err.message})
        return;
    }
    const errStatus = (err as ErrorStatus)
    if(!errStatus) return
    console.error(errStatus.message)
    res.status(errStatus.status).json({error:errStatus.message})
}

export type {
    predicate,
    ErrorStatus
}

export default {
    throwWhen,
    throwErrStatus,
    resWithErr
}