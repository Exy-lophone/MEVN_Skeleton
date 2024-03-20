const pattern_username = /^\w{3,255}$/
const pattern_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
const pattern_address = /^[a-z][0-9]$/
const pattern_name = /^[a-z\s]{1,}$/gi
const pattern_email = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/i
const pattern_date = /^[0-9]{2}.[0-9]{2}.([0-9]{2}$|[0-9]{4})$/
const pattern_zipcode = /^[0-9]{4}$/

const checkPattern = (str, pattern) => str.match(pattern) !== null ? true : false
const isUsernameValid = str => checkPattern(str,pattern_username)
const isPasswordValid = str => checkPattern(str,pattern_password)
const isAddressValid = str => checkPattern(str,pattern_address)
const isNameValid = str => checkPattern(str,pattern_name)
const isEmailValid = str => checkPattern(str,pattern_email)
const isDateValid = str => checkPattern(str,pattern_date)
const isZipCodeValid = str => checkPattern(str, pattern_zipcode)

module.exports = {
    isUsernameValid,
    isPasswordValid,
    isAddressValid,
    isNameValid,
    isEmailValid,
    isDateValid,
    isZipCodeValid
}