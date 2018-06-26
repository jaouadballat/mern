const Validator = require('validator');

module.exports = function(data) {
    let errors = {}

        data.name = data.name ? data.name : '';
        data.email = data.email ? data.email : '';
        data.password = data.password ? data.password : '';

    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = "name must be between 2 and  30 characters";
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = "Must be a valid email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password required";
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password = "Password not match"
    }

    if(!Validator.isLength(data.password, {min:3, max: 30})) {
        errors.password = "password must be between 3 and 30";
    }


    return errors;  
      
}