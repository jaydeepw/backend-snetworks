# GET Backend
A simple web service using NodeJS that exposes a GET API

# Problem Statement
[Filtering matches](https://github.com/sparknetworks/coding_exercises_options/blob/master/filtering_matches/README.md)


# Getting Started
- Make sure NodeJS `v9+` is installed on your computer
- Clone the repo on your computer
- Run `npm install` for downloading all the dependencies required for this backend
- Run `node app` to run the server

# There are some assumptions made when working on the provided data set here
- `display_name` is a mandatory `non-null` `non-empty` property
- For filter values that are sent 'false' for e.g. favourites, it has no effect on filtering. It will return both favourites and non-favourites
- For filter params like age, both `minAge` and `maxAge` are mandatory