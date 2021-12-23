import Express from "express";
import DB from "../database";
function Authenticate(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	res.write("hello form authenticate \n");
	next();
}
function Login(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	res.write("Hello form login\n");
	next();
}
export {
	Authenticate,
	Login,
}