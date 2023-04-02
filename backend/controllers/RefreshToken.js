import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const fname = user[0].fname;
            const lname = user[0].lname;
            const email = user[0].email;
            const role = user[0].role;
            const contact = user[0].contact;
            const location = user[0].location;
            
            const accessToken = jwt.sign({userId, fname, email,lname,role,location,contact},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15hr'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}