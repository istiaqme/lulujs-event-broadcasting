module.exports = class AuthenticationError extends Error {
    constructor(message){
        super(message);
        this.name = "AuthenticationError";
    }
}