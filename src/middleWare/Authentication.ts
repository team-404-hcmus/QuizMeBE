import Express from "express";
import db from "../database";

async function Authenticate(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	req.body.key += "";
	let data = await db.getUserCollection().findOne({loginKey:req.body.key});
	if(!data)
	{
		res.status(401);
		res.write("failed to authenticate");
		res.end();
		return;
	}
	res.locals = {info: data};
	next();
}
async function Login(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	// bodyParser.json(req.body);'
	let data = await db.getUserCollection().findOne({username:req.body.username,pwd:req.body.pwd});
	
	if(!data)
	{
		res.status(401);
		res.write("wrong user name or password");
		res.end();
		return;
	}else{

		const key = ""+Date.now();
		await db.getUserCollection().updateOne({_id:data._id},{$set:{loginKey:key}});
		res.write(key);
		next();
	}
}
export {
	Authenticate,
	Login,
}