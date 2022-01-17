import {appConfig, dbConfig} from "./config";
import Express from "express";
import { Authenticate, Login } from "./middleWare/Authentication";
import DB from './database';
import { Register } from "./middleWare/Register";
const app = Express();
import bodyParser  from "body-parser";
import { ChangePassword } from "./middleWare/ChangePassword";
import { getAllUserInfo, getUserInfo } from "./middleWare/UserInfo";
import { addQuestion, getQuestion } from "./middleWare/Question";
import { createUser, DeleteUser, EditUser } from "./middleWare/CreateUser";
(async function(){
await DB.ConnectDB();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/api/changePassword',Authenticate,ChangePassword);
app.post('/api/login',Login);
app.post('/api/getInfo',getUserInfo);
app.post('/api/getAllUser',Authenticate,getAllUserInfo);
app.post('/api/Question',getQuestion);
app.post('/api/AddQuestion',Authenticate,addQuestion);
app.post('/api/DeleteUser',Authenticate,DeleteUser);
app.post('/api/EditUser',Authenticate,EditUser);
app.post('/api/CreateUser',Authenticate,createUser);
app.use((req,res,next)=>{
  console.log("Request sended");
	res.end();
})
app.listen(appConfig.PORT, () => {
  console.log(`Example app listening at http://localhost:${appConfig.PORT}`)
});})()