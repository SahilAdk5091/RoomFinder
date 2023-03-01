import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import {Op, where} from "sequelize";

export const getRoom =async(req,res) => {
    try {
        let response;
        console.log(req.email)
        response = await Product.findAll({
            attributes:['uuid','name','price'],
            where:{
                userId: req.userId
                
            },
            include:[{
                model: User,
                attributes:['fname','lname','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getRoomById =async(req,res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.parms.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data not found"});
        let response;
        if(req.role == "admin"){
            response = await Product.findOne({
                attributes:['uuid','name','price'],
            where:{
                id: product.id
            },
            include:[{
                model: User,
                attributes:['fname','lname','email']
            }] 

            });
    }else{
        response = await Product.findOne({
            attributes:['uuid','name','price'],
            where:{
                [Op.and]:[{id: product.id},{userId: req.userId}]
            },
            include:[{
                model: User,
                attributes:['fname','lname','email']
            }]
        });
    }
    res.status(200).json(response);
    } catch (error) {
        
    }
    
}

export const createRoom =async(req,res) => {
    const {name,price} = req.body;
    try {
        await Product.create({
            name:name,
            price:price,
            userId: req.userId
        });
        res.status(201).json({msg:"Product Created"})
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    
}

export const updateRoom =async(req,res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.parms.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data not found"});
        const {name, price} = req.body;
        if(req.role == "admin"){
            await Product.update({name,price},{
                where:{
                    id: Product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Frobiden"})
            await Product.update({name,price},{
                where:{
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                },
                });
        }
        res.status(200).json({msg: "Product Updated sucessfully"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    
    
}

export const deleteRoom =async(req,res) => {
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.parms.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data not found"});
        const {name, price} = req.body;
        if(req.role == "admin"){
            await Product.destroy({
                where:{
                    id: Product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "Frobiden"})
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                },
                });
        }
        res.status(200).json({msg: "Product deleted sucessfully"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    
}
