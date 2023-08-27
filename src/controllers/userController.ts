import { Request,Response } from "express";
import Users from "../Models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../.env') });

export const userLogin = async(req:Request,res:Response)=>{
 var {email,password} = req.body;
 try {
    if(!email ||!password){
        return res.status(401).json({message:"please enter all the fields"});
    }
    const currUser= await Users.findOne({where:{email:email}});
    if(currUser){
        const pass:string= currUser.password;
    const resu = await bcrypt.compare(password,pass);
    if(resu){
        let token = jwt.sign({id:currUser.id,email:currUser.email},process.env.SECRET_KEY as string) ;
        return res.status(201).json({token:token,user:currUser});
    }
    else{
        return res.status(401).json({message:"Incorrect password or email"});
    }
    }
    return res.status(404).json({"message":"User not found!"});

    
 } catch (error) {
    console.error(error);
    return res.status(501).json({error:error});
 }


}
export const userSignup = async(req:Request,res:Response)=>{
    var {username,email,password} = req.body;
    try {
        const existingUser = await Users.findOne({
            where: { name: username }
          });
        if(existingUser){
            return res.status(401).json({"message":"User already exists"});
        }
        const salt = 12;
    bcrypt.hash(password, salt, async function(err, hash) {
        if(err){
            console.error(err);
            return;
        }
        else{
            let newUser = await Users.create({name:username,email:email,password:hash});
            console.log("Users username is :", newUser.name);
            res.status(201).json({"message": "Successfully added user!"});
            return res.redirect("../login");
        }
    });
        
    } catch (error) {
        console.error(error);
        res.status(502).json({"message":error});
    }
}

