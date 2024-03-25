const pattern_username = /^\w{3,255}$/
const pattern_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
const pattern_closet = /^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/
const pattern_room = /^[A-C][0-9]{2}$/

/**
 * 
 * @param {String} str - to validate
 * @param {RegExp} pattern - validation pattern
 * @returns {Boolean} - True if validated
 */
const checkPattern = (str, pattern) => str.match(pattern) !== null ? true : false

module.exports = {
    checkPattern,
    pattern_username,
    pattern_password,
    pattern_closet,
    pattern_room
}