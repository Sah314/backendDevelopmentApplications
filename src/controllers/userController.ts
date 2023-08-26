import { Request,Response } from "express";
import Users from "../Models/users";
import bcrypt from "bcrypt";
export const userLogin = (req:Request,res:Response)=>{
 var {email,password} = req.body;

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
            return res.status(201).json({"message": "Successfully added user!"});
        }
    });
        
    } catch (error) {
        console.error(error);
        res.status(502).json({"message":error});
    }
}

