class PhotosFilterController {

    static filter(items) {
        return items.filter(this.hasPhoto)
    }

    static hasPhoto(value) {
        return value.main_photo != null &&
        value.main_photo != 'undefined' &&
        value.main_photo != ''
    }
}

module.exports = PhotosFilterController