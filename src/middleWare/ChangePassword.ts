import Express  from "express";
import db from "../database";
async function ChangePassword(req:Express.Request,res:Express.Response,next:Express.NextFunction){
	const collection  = db.getUserCollection();
	const data = await collection.findOne({loginKey:req.body.key,pwd:req.body.pwd});
	if(!data)
	{
		res.status(401);
		res.write("wrong password");
		res.end();
		return;
	}
	collection.updateOne({_id:data._id},{$set:{pwd:req.body.newPwd}});
	next();
}
export {
	ChangePassword
}