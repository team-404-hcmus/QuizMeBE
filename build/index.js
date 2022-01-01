"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const Authentication_1 = require("./middleWare/Authentication");
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const ChangePassword_1 = require("./middleWare/ChangePassword");
const UserInfo_1 = require("./middleWare/UserInfo");
const Question_1 = require("./middleWare/Question");
(async function () {
    await database_1.default.ConnectDB();
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(body_parser_1.default.json());
    app.post('/api/changePassword', Authentication_1.Authenticate, ChangePassword_1.ChangePassword);
    app.post('/api/login', Authentication_1.Login);
    app.post('/api/getInfo', UserInfo_1.getUserInfo);
    app.post('/api/Question', Question_1.getQuestion);
    app.use((req, res, next) => {
        console.log("Request sended");
        res.end();
    });
    app.listen(config_1.appConfig.PORT, () => {
        console.log(`Example app listening at http://localhost:${config_1.appConfig.PORT}`);
    });
})();
