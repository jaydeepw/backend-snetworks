// Makes more sense in keeping constants here
// I am not very sure if keeping end points here is a good idea though

module.exports = Object.freeze({
    DB_PATH: "data/data.json",
    AGE_LOWER_BOUND: 18,
    AGE_UPPER_BOUND: 95,
    ENDPOINT_MATCHES: "/matches",

    QUERY_HAS_PHOTO: 'hasPhoto',
    QUERY_IS_FAVOURITE: 'isFavourite',
    QUERY_AGE_MIN: 'minAge',
    QUERY_AGE_MAX: 'maxAge'
});