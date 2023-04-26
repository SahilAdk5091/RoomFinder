import Users from '../models/UserModel.js';
import Room from '../models/RoomModels.js';
import Booked from '../models/Booked.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUsers = async(req,res) => {
    let response;
    try {
        const users = await Users.findAll({
            attributes:['id','fname','lname','email']
        });
        res.json(users)
    } catch (error) {
        console.log(error);   
    }
}

export const getUsersById = async(req,res) => {
    let response;
    try {
        const users = await Room.findAll({
            where:{
                userid: req.params.userid
            }
        });
        res.json(users)
    } catch (error) {
        console.log(error);   
    }
}

export const getBookedRoomById = async(req,res) => {
    let response;
    try {
        const booked = await Booked.findAll({
            where:{
                userid: req.params.userid
            }
        });
        res.json(booked)
    } catch (error) {
        console.log(error);   
    }
}


export const Register = async(req,res)=>{
    const { fname, lname, email, contact, role ,password, confpassword,location } = req.body;
    console.log(email);
    
    if(password !== confpassword) return res.status(400).json({msg:"Password and confirm password don`t match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            fname: fname,
            lname: lname,
            email: email,
            contact: contact,
            role: role,
            password: hashPassword,
            location:location
        });
        res.json({msg:"Register sucess"});
    } catch (error) {
        console.log(error);
    }
}

export const postbook = async(req,res)=>{
    const { name, location, price, service, contact ,buserid, roomid,userid} = req.body;
    try {
        await Booked.create({
            name: name,
            location: location,
            price: price,
            service: service,
            contact: contact,
            buserid: buserid,
            roomid:roomid,
            userid:userid
        });
        res.json({msg:"Booked sucessfull"});
    } catch (error) {
        console.log(error);
    }
}



export const Login = async(req,res) =>{
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password,user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong password"});
        const userId = user[0].id;
        const fname = user[0].fname;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, fname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, fname, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxage: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

    } catch (error) {
        res.status(404).json({msg:"Email wrong"})
    }
}


export const Logout = async(req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id:userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

