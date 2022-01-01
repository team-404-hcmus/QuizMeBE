import Express from "express";
import { write } from "fs";
import { ObjectId } from "mongodb";
import db from "../database";
async function getQuestion(req:Express.Request,res:Express.Response,next:Express.NextFunction)
{
	const qsCollection = db.getQuestionCollection();
	if(req.body.QuestionID)
	{
		console.log(req.body);
		const data = await qsCollection.findOne(new ObjectId(req.body.QuestionID));
		console.log(data);
		res.write(JSON.stringify(data));
	}
	else{
		const data = qsCollection.find({}, {projection:{name:1}}); 
		res.write(JSON.stringify(await data.toArray()));
	}
	next();

}
async function getAllQuestion(req:Express.Request,res:Express.Response,next:Express.NextFunction)
{
	if(req.body.QuestionID)
	{
		const qsCollection = db.getQuestionCollection();
		const data = qsCollection.find({}, {projection:{name:1}}); 
		res.write(JSON.stringify(await data.toArray()));
		next();
	}
	else{
		res.status(404);
		res.write('wrong format');
		res.end();
		return;
	}
}

export  {
	getQuestion,
	getAllQuestion
}