const Validator = require('validator');

module.exports = function (data) {
    let errors = {};


    data.title = data.title ? data.title : '';
    data.location = data.location ? data.location : '';
    data.company = data.company ? data.company : '';


    if (Validator.isEmpty(data.title)) {
        errors.title = "title is require";
    }

    if (Validator.isEmpty(data.location)) {
        errors.location = "location is require";
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "company is require";
    }

    return errors;
}