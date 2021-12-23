import {appConfig, dbConfig} from "./config";
import Express from "express";
import { Authenticate, Login } from "./middleWare/Authentication";
import DB from './database';
import { Register } from "./middleWare/Register";
const app = Express();

(async function(){
await DB.ConnectDB();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/api/',Authenticate);
app.get('/api/login',Login);
app.get('/api/register',Register);

app.use((req,res,next)=>{
	res.end();
})
app.listen(appConfig.PORT, () => {
  console.log(`Example app listening at http://localhost:${appConfig.PORT}`)
});})()