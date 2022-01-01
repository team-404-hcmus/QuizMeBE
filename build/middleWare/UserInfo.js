"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
function getUserInfo(req, res, next) {
    if (req.body.username) {
        res.write(JSON.stringify({
            username: "19127614",
            fullname: "Tuan GAY",
            dob: "25/12/2001",
            gender: "Male"
        }));
        next();
        return;
    }
    res.status(401);
    res.write("Username not found");
    res.end();
}
exports.getUserInfo = getUserInfo;
