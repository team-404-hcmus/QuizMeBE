import {appConfig, dbConfig} from "./config";
import Express from "express";
import { Authenticate, Login } from "./middleWare/Authentication";
import DB from './database';
import { Register } from "./middleWare/Register";
const app = Express();
import bodyParser  from "body-parser";
import { ChangePassword } from "./middleWare/ChangePassword";
import { getUserInfo } from "./middleWare/UserInfo";
import { getAllQuestion, getQuestion } from "./middleWare/Question";
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
app.post('/api/Question',getQuestion);

app.use((req,res,next)=>{
  console.log("Request sended");
	res.end();
})
app.listen(appConfig.PORT, () => {
  console.log(`Example app listening at http://localhost:${appConfig.PORT}`)
});})()