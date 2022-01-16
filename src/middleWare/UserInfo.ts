import Express  from "express";
import { Admin } from "mongodb";
import db from "../database";
async function getUserInfo(req:Express.Request,res:Express.Response,next:Express.NextFunction){
	if(req.body.username)
	{
		let data = await db.getUserCollection().findOne({username:req.body.username});
		console.log(data);
		if(!data || !(delete data.pwd))
		{
			res.status(401);
			res.write("fail to retrieve user info");
			res.end();
			return;
		}
		res.write(JSON.stringify(data));
		next();
		return;
	}
	res.status(401);
	res.write("Username not found");
	res.end();
}
async function getAllUserInfo(req:Express.Request,res:Express.Response,next:Express.NextFunction) {
	if(!res.locals.info || res.locals.info.role !== 'admin')
	{
		res.status(502);
		res.end();
		return;
	}
	const data = await db.getUserCollection().find({}, {projection:{_id:0,username:1,role:1,pwd:1}});
	res.write(JSON.stringify(await data.toArray()));

	next();
}
export{
	getUserInfo,
	getAllUserInfo
}