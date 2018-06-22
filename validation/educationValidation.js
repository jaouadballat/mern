const Validator = require('validator');

module.exports = function (data) {
    let errors = {};


    data.school = data.school ? data.school : '';
    data.degree = data.degree ? data.degree : '';
    data.field = data.field ? data.field : '';


    if (Validator.isEmpty(data.school)) {
        errors.school = "school is require";
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "degree is require";
    }

    if (Validator.isEmpty(data.field)) {
        errors.field = "field is require";
    }

    return errors;
}