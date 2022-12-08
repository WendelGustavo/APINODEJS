const userModel = require("../models/userModel");

exports.get = async () => {
    return await userModel.get();
};
exports.login = async (data) => {
    return await userModel.login(data);
};

exports.logout = async (token) => {
    return await userModel.login(data);
};

exports.verifyJWT = (token) => {
    return userModel.verifyJWT(token);
};
