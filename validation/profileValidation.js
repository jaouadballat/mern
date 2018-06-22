const Validator = require('validator');

module.exports = function(data) {
    let errors = {};

    data.status = data.status ? data.status : '';
    data.skills = data.skills ? data.skills : '';
    data.handle = data.handle ? data.handle : '';

    if(Validator.isEmpty(data.status)) {
        errors.status = "status is require";
    }
    
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "handle is require";
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "skills is require";
    }

    return errors;
}