class Utils {

    static hasBothParamsOrHasNone(req, paramName1, paramName2) {
        // ensure both query params exist or none
        if ((!req.query.hasOwnProperty(paramName1) &&
                !req.query.hasOwnProperty(paramName2)) 
            ||
            (req.query.hasOwnProperty(paramName1) &&
                req.query.hasOwnProperty(paramName2))) {
                    return true
                } else {
                    return false
                }
    }
}

module.exports = Utils