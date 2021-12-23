"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Authenticate = void 0;
const database_1 = __importDefault(require("../database"));
async function Authenticate(req, res, next) {
    console.log(req.body);
    let data = await database_1.default.getCollection().findOne({ loginKey: req.body.key });
    if (!data) {
        res.status(404);
        res.write("failed to authenticate");
    }
    else {
        res.write("successfully sign in");
    }
    next();
}
exports.Authenticate = Authenticate;
async function Login(req, res, next) {
    // bodyParser.json(req.body);'
    console.log(req.body);
    let data = await database_1.default.getCollection().findOne({ username: req.body.username, pwd: req.body.pwd });
    if (!data) {
        res.status(500);
        res.send("HA HA Tạo nick đi ml");
    }
    else {
        const key = "" + Date.now();
        await database_1.default.getCollection().updateOne({ _id: data._id }, { $set: { loginKey: key } });
        res.write(key);
        next();
    }
}
exports.Login = Login;
