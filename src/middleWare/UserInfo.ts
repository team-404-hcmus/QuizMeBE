import Express  from "express";

function getUserInfo(req:Express.Request,res:Express.Response,next:Express.NextFunction){
	if(req.body.username)
	{
	res.write(JSON.stringify({
	username:"19127614",
        fullname:"Tuan GAY",
            dob:"25/12/2001",
            gender:"Male"}));
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