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

    static hasValidMinAge(minAge) {
        return minAge >= 18
    }

    static getInvalidMinAgeMessage() {
        return "'minAge' cannot be less than 18"
    }
}

module.exports = AgeFilterController