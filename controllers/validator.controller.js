module.exports = class Validator{

    constructor(){}

    validateEmptyOrWhiteSpace(args){
            
        if(!args || !/\S/.test(args))
            return false;
        else
            return true;
    }

    findValue(obj, value){
        for( var prop in obj){

            if(obj.hasOwnProperty(prop) && obj[prop] === value)
                return true;

        }

        return false;
    }

}