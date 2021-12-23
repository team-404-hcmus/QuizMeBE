"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Authenticate = void 0;
function Authenticate(req, res, next) {
    res.write("hello form authenticate \n");
    next();
}
exports.Authenticate = Authenticate;
function Login(req, res, next) {
    res.write("Hello form login\n");
    next();
}
exports.Login = Login;
