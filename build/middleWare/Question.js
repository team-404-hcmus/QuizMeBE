"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuestion = exports.getQuestion = void 0;
const mongodb_1 = require("mongodb");
const database_1 = __importDefault(require("../database"));
async function getQuestion(req, res, next) {
    const qsCollection = database_1.default.getQuestionCollection();
    if (req.body.QuestionID) {
        console.log(req.body);
        const data = await qsCollection.findOne(new mongodb_1.ObjectId(req.body.QuestionID));
        console.log(data);
        res.write(JSON.stringify(data));
    }
    else {
        const data = qsCollection.find({}, { projection: { name: 1 } });
        res.write(JSON.stringify(await data.toArray()));
    }
    next();
}
exports.getQuestion = getQuestion;
async function getAllQuestion(req, res, next) {
    if (req.body.QuestionID) {
        const qsCollection = database_1.default.getQuestionCollection();
        const data = qsCollection.find({}, { projection: { name: 1 } });
        res.write(JSON.stringify(await data.toArray()));
        next();
    }
    else {
        res.status(404);
        res.write('wrong format');
        res.end();
        return;
    }
}
exports.getAllQuestion = getAllQuestion;
