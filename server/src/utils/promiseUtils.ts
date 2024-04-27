function isFulfilled<T> (p:PromiseSettledResult<T>): p is PromiseFulfilledResult<T> {
    return p.status === 'fulfilled'
}
function isRejected<T> (p:PromiseSettledResult<T>): p is PromiseRejectedResult {
    return p.status === 'rejected';
}

export default {
    isFulfilled,
    isRejected
}