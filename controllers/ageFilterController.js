const constants = require('../utils/constants')

class AgeFilterController {

    static filter(items, minAge, maxAge) {
        var range = {lower: minAge, upper: maxAge}
        return items.filter(this.isInRange, range)
    }

    static isInRange(value) {
        return value.age >= this.lower && value.age <= this.upper;
    }

    static getAgeQueryParamValidationMsg() {
        return "'minAge' & 'maxAge' both are needed"
    }

    static hasValidMinAge(age) {
        try {
            age = parseInt(age)
            return typeof age == 'number' && age >= constants.AGE_LOWER_BOUND
        } catch(e) {
            return false
        }
    }

    static hasValidMaxAge(age) {
        try {
            age = parseInt(age)
            return typeof age == 'number' && age <= constants.AGE_UPPER_BOUND
        } catch(e) {
            return false
        }
    }

    static getInvalidMinAgeMessage() {
        return "'minAge' invalid or less than 18"
    }

    static getInvalidMaxAgeMessage() {
        return "'maxAge' invalid or greater than 95"
    }
}

module.exports = AgeFilterController