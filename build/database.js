"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const credentials = path_1.default.join(__dirname, config_1.dbConfig.cert);
const client = new mongodb_1.MongoClient('mongodb+srv://cluster0.gbld1.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    sslKey: credentials,
    sslCert: credentials
});
let database;
let collection;
let Question;
async function ConnectDB() {
    try {
        await client.connect();
        database = client.db("404TEAM");
        collection = database.collection("Quizme");
        Question = database.collection('Question');
    }
    finally {
    }
}
function getUserCollection() {
    return collection;
}
function getQuestionCollection() {
    return Question;
}
exports.default = {
    ConnectDB,
    getUserCollection,
    getQuestionCollection
};
