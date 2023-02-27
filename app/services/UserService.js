const User = require('../models/mongoose/User');
const { db } = require('../helpers');
const AuthSessionService = lulu.use('app/services/AuthSessionService');

async function create (data) {
    let newUser = new User(data);
    return await newUser.save();
}

async function login (data) {
    const user = await checkUserByEmailAndPassword(data.email, data.password);
    if(user){
        const session = await AuthSessionService.makeSession(user._id);
        return {
            userId: user._id,
            token: session.token
        };
    }

}


async function checkUserByEmailAndPassword(email, password){
    return await User.findOne({email: email, password: password});
}

async function list () {
    return await User.find();
}

async function details (id) {
    if(!db.isValidObjectId(id)){
        return null;
    } // return null if id is not valid ObjectId to avoid error in mongoose.
    console.log(id);
    return await User.findOne({_id: id});
}

module.exports = {
    create,
    list,
    details,
    login
}


