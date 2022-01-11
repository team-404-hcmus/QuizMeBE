import Express  from "express";

function getUserInfo(req:Express.Request,res:Express.Response,next:Express.NextFunction){
	if(req.body.username)
	{
	res.write(JSON.stringify(res.locals.info));
	    next();
	    return;
	}
	res.status(401);
	res.write("Username not found");
	res.end();
}
export{
	getUserInfo
}