const STATUS_OK = 200
const STATUS_OK_CREATED = 201
const STATUS_OK_NOCONTENT = 204
const STATUS_MULTI_STATUS = 207
const STATUS_BAD_REQUEST = 400
const STATUS_UNAUTHORIZED = 401
const STATUS_NOTFOUND = 404
const STATUS_INTERNALERR = 500
const multiStatusCode = (passed, failed, ok, bad) => passed.length > 0 ? failed.length > 0 ? STATUS_MULTI_STATUS : ok : bad

module.exports = {
    STATUS_OK,
    STATUS_OK_CREATED,
    STATUS_OK_NOCONTENT,
    STATUS_MULTI_STATUS,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORIZED,
    STATUS_NOTFOUND,
    STATUS_INTERNALERR,
    multiStatusCode
}