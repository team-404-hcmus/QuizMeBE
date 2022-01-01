"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const database_1 = __importDefault(require("../database"));
async function Register(req, res, next) {
    try {
        let data = await database_1.default.getUserCollection().findOne({ username: "TUAN" });
        if (!!data) {
            await database_1.default.getUserCollection().updateOne({ _id: data._id }, { $set: { loginKey: "" + Date.now() } });
            console.log(data);
            throw "";
        }
        await database_1.default.getUserCollection().insertOne({ username: "TUAN", pwd: "123" });
        res.send("Successfully created ");
    }
    finally {
        res.send("Failed");
    }
}
exports.Register = Register;
