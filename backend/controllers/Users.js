import Users from '../models/UserModel.js';
import Room from '../models/RoomModels.js';
import Booked from '../models/Booked.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/Database.js'
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

const sendMail = async(email, mailSubject, content)=>{
    try {
        
        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'personaluse5091@gmail.com',
                pass:'gjvnloghvrdixzco' 
            }
        });
        const mailOption = {
            from:'personaluse5091@gmail.com',
            to:email,
            subject:mailSubject,
            html:content
        }

        transport.sendMail(mailOption, function(error,info){
            if(error){
                console.log(error);

            }
            else{
                console.log('Mail sent sucessfully');

            }
        })



    } catch (error) {
        console.log(error.message);
    }

}

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

export const getCrateId = async(req,res) => {
    let response;
    try {
        const crate = await Booked.findAll({
            where:{
                buserid: req.params.buserid
            }
        });
        res.json(crate)
    } catch (error) {
        console.log(error);   
    }
}


export const Register = async(req,res)=>{
    
    if(req.body.password !== req.body.confpassword){
        
        return res.status(400).json({msg: "Password doesn`t match"});
    }
    else if(req.body.password.length <5){
        return res.status(400).json({msg:"Password must be atleast 5 character"});
    }
    else{
         const  user =  await Users.findOne({where:{email: req.body.email}})
            if(user) {
                let errors =[];
                return res.status(400).json({msg:"Email already exists"});
                res.json({msg:"Email already exists"});
            }else{
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password,salt);
                const newUSer = {
                    fname : req.body.fname,
                    lname : req.body.lname,
                    email : req.body.email,
                    contact:req.body.contact,
                    role : req.body.role,
                    password : hash,
                    location : req.body.location,
                }
                new Users(newUSer).save();
                let mailSubject = 'Mail Verification'
                const randomToken = randomstring.generate();
                
                let content = '<p>Hi '+req.body.fname+', \
                Please <a href= "https://124.0.0.1:3000/mail-verification?token='+randomToken+'">Verify</a>your mail';
                sendMail(req.body.email,mailSubject,content);
                // const updatetoken = await Users.update({where:{email:req.body.email}},{ $set: {token: randomToken}});
                // console.log(updatetoken);

                // const query = await db.query('UPDATE users set token=? where email=?',[randomToken,req.body.email],function(error,result,fields){
                //     if(error){
                //         return res.status(400).send({
                //             msg:err
                //         })
                //     }
                // });

                console.log("Register Sucessfull"); 
            }
        


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

