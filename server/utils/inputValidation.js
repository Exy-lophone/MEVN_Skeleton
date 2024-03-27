const pattern_username = /^\w{3,255}$/
const pattern_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
const pattern_closet = /^INF-[A-C][0-9]{2}-ARM[0-9]{1,}$/
const pattern_room = /^[A-C][0-9]{2}$/

/**
 * 
 * @param {String} property - the property to check
 * @param {Boolean} required - if the property is required
 * @param {String} type - type of the property
 * @param {RegExp} pattern - regex pattern that property should match (leave arg empty if no pattern required)
 * @returns 
 */
const makeCriteria = (property, required, type, pattern) => ({property, required, type, pattern})
/**
 * 
 * @param {String} str - to validate
 * @param {RegExp} pattern - validation pattern
 * @returns {Boolean} - True if validated
 */
const checkPattern = (str, pattern) => str.match(pattern) !== null ? true : false
/**
 * 
 * @param {any} x - value to check 
 * @returns - true if values equals null or undefined
 */
const isNullUndefined = x => x === null || x === undefined 
/**
 * 
 * @param {Object} obj - object to test
 * @param {Array} criterias - array of criterias
 * @returns - Array of error message if there's any
 */
const checkObject = (obj, criterias) => {
    return criterias.reduce((acc, crit) => {
        const elem = obj[crit.property]
        if(isNullUndefined(elem)) {
            if(crit.required) acc.push(`${crit.property} is undefined`)
            return acc
        }
        if(typeof(elem) !== crit.type) acc.push(`${crit.property} should be type of ${crit.type}`)
        else {
            if(!isNullUndefined(crit.pattern)) {
                if(!checkPattern(elem, crit.pattern)) acc.push(`${crit.property} should follow this pattern ${crit.pattern}`)
            }
        }
        return acc
    }, [])
}

module.exports = {
    isNullUndefined,
    checkPattern,
    makeCriteria,
    checkObject,
    pattern_username,
    pattern_password,
    pattern_closet,
    pattern_room
}