import db from "../database";
import Express from "express";
import { userInfo } from "os";
async function createUser(req:Express.Request,res:Express.Response, next: Express.NextFunction)
{
	delete req.body["key"];
	Object.keys(req.body).filter(e => e !=="key").forEach(value=>{
		if(!req.body[value])
		{
			delete req.body[value];
		}
	});
	const data = Object.keys(req.body);
	const keys = ['username','pwd','role','dob','gender',"fullname"];
	console.log(req.body);
	if( !data.every((e: string)=>  keys.includes(e) ))
	{
		res.status(400);
		res.send('wrong format');
		return;
	}
	if(res.locals.info.role !== 'admin')
	{
		res.status(403);
		res.send('you are not authorized for this action');
		return;
	}
	const UserInfo  = await db.getUserCollection().findOne({'username':req.body.username});
	if(UserInfo)
	{
		res.status(409);
		res.send('user name exist');
		return;
	}
	db.getUserCollection().insertOne(req.body);
	next();
}
function EditUser(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	const username = req.body.username;
	if(username){
		delete req.body.username;
		delete req.body.key;
		db.getUserCollection().updateOne({username:username},{$set:{...req.body}}) 
		next();
		return;
	}
	res.status(400);
	res.send("wrong format");
	return;
}
function DeleteUser(req:Express.Request,res:Express.Response, next: Express.NextFunction){
	const username = req.body.username;
	if(username){
		db.getUserCollection().deleteOne({username:username});
		next();
		return;
	}
	res.status(400);
	res.send("wrong format");
	return;

}
export{
	DeleteUser,
	EditUser,
	createUser	
}