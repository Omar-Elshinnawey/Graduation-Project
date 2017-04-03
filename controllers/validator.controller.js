function Validator() {}

Validator.prototype.validateEmptyOrWhiteSpace = function(args) {

    if (args == undefined || !/\S/.test(args))
        return false;
    else
        return true;
}

Validator.prototype.findValue = function(obj, value) {
    for (var prop in obj) {

        if (obj.hasOwnProperty(prop) && obj[prop] == value)
            return true;

    }

    return false;
}

module.exports = Validator;