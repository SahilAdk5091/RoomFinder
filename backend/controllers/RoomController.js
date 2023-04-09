import Room from '../models/RoomModels.js';
import path from 'path';
import fs from 'fs';
import User from '../models/UserModel.js'

export const getRoom = async(req,res)=>{
    try {
        const response = await Room.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }

}

export const getRoomById = async(req,res)=>{
    try {
        const response = await Room.findAll(
            {
                where:{
                    userid: req.params.userid
                }
            });
        res.status.json(response);
    } catch (error) {
        console.log(error.message);
    }
    
}

export const saveRoom = (req,res)=>{
    if(req.files == null) return res.status(400).json({msg:"No File Uploaded"});
    const name = req.body.name;
    const location = req.body.location;
    const price = req.body.price;
    const service = req.body.service;
    const email = req.body.email;
    const contact = req.body.contact;
    const userid = req.body.userid;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg: "Invalid image"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Room.create({name:name,location:location,price:price,service:service,email:email,contact:contact,userid:userid,image: fileName,url:url});
            res.status(201).json({msg:"Romm Added Sucessfully"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateRoom = async(req,res)=>{
    const room = await Room.findOne(
        {
            where:{
                id: req.params.id
            }
        });
        if(!room) return res.status(404).json({msg: "No Data Found"});
        let fileName = "";
        if(req.files == null){
            fileName = Room.image;
        }
        else{
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.png','.jpg','.jpeg'];
            if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg: "Invalid image"});
            if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

            const filepath = `./public/images/${room.image}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/images/${fileName}`, (err)=>{
                if(err) return res.status(500).json({msg: err.message});
                
            })
        }
        const name = req.body.name;
        const location = req.body.location;
        const price = req.body.price;
        const service = req.body.service;
        const email = req.body.email;
        const contact = req.body.contact;
        const userid = req.body.userid;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        try {
            await Room.update({name:name,location:location,price:price,service:service,email:email,contact:contact,userid:userid,image: fileName,url:url},{
                where:{
                    id:req.params.id
                }
            });
            res.status(200).json({msg: "Room Updated sucessfully"});
        } catch (error) {
            console.log(error.message);
            
        }
    
}

export const deleteRoom = async(req,res)=>{
    const room = await Room.findOne(
        {
            where:{
                id: req.params.id
            }
        });
        if(!room) return res.status(404).json({msg: "No Data Found"});
        try {
            const filepath = `./public/images/${room.image}`;
            fs.unlinkSync(filepath);
            await Room.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: "Room deleted sucessfully"})
        } catch (error) {
            
        }
}

export const findRoom = async(req,res)=>{
    try{
    const response = await Room.findAll(
        {
            where:{
                id: req.params.id
            }
        });
        res.json(response);
        } catch (error) {
            console.log(error.message);
        }
}