const Validator = require('validator');

module.exports = function (data) {
    let errors = {}

    data.email = data.email ? data.email : '';
    data.password = data.password ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = "Must be a valid email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required";
    }


    return errors;

}