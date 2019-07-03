const fs = require('fs')
const constants = require('../utils/constants')

class FavouritesFilterController {

    static filter(items) {
        return items.filter(this.isFavourite)
    }

    static isFavourite(value) {
        return value.favourite != null &&
        value.favourite != 'undefined' &&
        value.favourite != ''  &&
        value.favourite == true;
    }
}

module.exports = FavouritesFilterController