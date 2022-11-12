import CustomApiError from "./CustomApi.js";

class UnauthenticatedError extends CustomApiError{
    constructor(message){
        super(message);

        this.statusCode = 401;
    }
}

export default UnauthenticatedError; 