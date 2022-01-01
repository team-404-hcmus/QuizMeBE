import Express from "express";
import db from "../database";
async function Register(req:Express.Request,res:Express.Response,next:Express.NextFunction){
	try{
		let data = await db.getUserCollection().findOne({username:"TUAN"});
		
		if(!!data)
		{
			
			await db.getUserCollection().updateOne({_id:data._id},{$set:{loginKey:""+Date.now()}});
			console.log(data);
			throw"";
		}
		await db.getUserCollection().insertOne({username:"TUAN",pwd:"123"});
		res.send("Successfully created ");
	}finally{

		res.send("Failed");
	}
}

export {
	Register
}