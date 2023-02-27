const Handler = lulu.use('app/errors/Handler');
const UserService = lulu.use('app/services/UserService');
const response = lulu.use('app/responses/Response');
const Event = lulu.use('app/responses/Event');

module.exports = {
    register : async function (req, res) {
        try{

            const newUser = await UserService.create(req.body);
            return response.dispatch("User Created Successfully", {newUser}, res, 201); // wrap data in object to avoid confusion
        }
        catch(error){
            return response.error(Handler(error), res);
        }
    },
    login : async function (req, res) {
        try{
            const loginData = await UserService.login(req.body);
            return response.dispatch("User Logged In Successfully", {loginData}, res, 200);
        }
        catch(error){
            return response.error(Handler(error), res);
        }
    }
}