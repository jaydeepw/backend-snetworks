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
        return age >= constants.AGE_LOWER_BOUND
    }

    static hasValidMaxAge(age) {
        return age <= constants.AGE_UPPER_BOUND
    }

    static getInvalidMinAgeMessage() {
        return "'minAge' cannot be less than 18"
    }

    static getInvalidMaxAgeMessage() {
        return "'maxAge' cannot be greater than 95"
    }
}

module.exports = AgeFilterController