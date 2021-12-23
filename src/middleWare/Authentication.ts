import Express from "express";
import db from "../database";

async function Authenticate(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	console.log(req.body)
	let data = await db.getCollection().findOne({loginKey:req.body.key});
	if(!data)
	{
		res.status(404);
		res.write("failed to authenticate");
	}
	else{
		res.write("successfully sign in");
		
	}
	next();
}
async function Login(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	// bodyParser.json(req.body);'
	console.log(req.body);
	let data = await db.getCollection().findOne({username:req.body.username,pwd:req.body.pwd});
	
	if(!data)
	{
		res.status(500);
		res.send("HA HA Tạo nick đi ml");
		
	}else{

		const key = ""+Date.now();
		await db.getCollection().updateOne({_id:data._id},{$set:{loginKey:key}});
		res.write(key);
		next();
	}
}
export {
	Authenticate,
	Login,
}