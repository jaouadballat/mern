const Validator = require('validator');

module.exports = function (data) {
    let errors = {};


    data.text = data.text ? data.text : '';



    if (Validator.isEmpty(data.text)) {
        errors.text = "text is require";
    }


    return errors;
}