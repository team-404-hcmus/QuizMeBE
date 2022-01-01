"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = void 0;
const database_1 = __importDefault(require("../database"));
async function ChangePassword(req, res, next) {
    const collection = database_1.default.getUserCollection();
    const data = await collection.findOne({ loginKey: req.body.key, pwd: req.body.pwd });
    if (!data) {
        res.status(401);
        res.write("wrong password");
        res.end();
        return;
    }
    collection.updateOne({ _id: data._id }, { $set: { pwd: req.body.newPwd } });
    next();
}
exports.ChangePassword = ChangePassword;
