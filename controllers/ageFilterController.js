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
}

module.exports = AgeFilterController