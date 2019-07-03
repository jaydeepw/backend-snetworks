class Utils {

    static hasBothParamsOrHasNone(req, paramName1, paramName2) {
        // ensure both query params exist or none
        if (this.hasNoBothParams(req, paramName1, paramName2) 
            || this.hasBothParams(req, paramName1, paramName2)) {
                    return true
                } else {
                    return false
                }
    }

    static hasNoBothParams(req, paramName1, paramName2) {
        // ensure both query params dont exist
        return !req.query.hasOwnProperty(paramName1) &&
            !req.query.hasOwnProperty(paramName2)
    }

    static hasBothParams(req, paramName1, paramName2) {
        // ensure both query params exist
        return req.query.hasOwnProperty(paramName1) &&
            req.query.hasOwnProperty(paramName2)
    }
}

module.exports = Utils