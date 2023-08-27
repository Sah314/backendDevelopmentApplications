import { Request,Response } from "express"
import Todo from "../Models/todos";
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    token: string|JwtPayload|undefined;
   }

const addTodos = async(req:Request,res:Response)=>{
    try {
        const token = (req as CustomRequest).token;
            
        if(token && typeof token !== "string" && "id" in token){
            const {title,description} = req.body;
            if(!title || !description){
                res.status(404).json({message:"Title or description of todo not found"});
            }
            const todo = await Todo.create({name:title,description:description,userid:token.id});
            res.status(201).send({message:"todo created successfully",data:{...todo}});
        }
        else{
            res.status(404).json({"message":"token not found"});
        }
    } catch (error) {
        res.status(501).json({message:"Server error"});
    }
   

}
const getTodos = async(req:Request,res:Response)=>{
    try {
        const token = (req as CustomRequest).token;
    if(token && typeof token !== "string" && "id" in token){
        const todos = await Todo.findAll({where:{userid:token.id}});
        if(!todos){
            res.status(404).json({message:"Todo doesnt exist"});
        }
        res.status(200).send({message:"todos fetched successfully",data:[...todos]});
    }
    } catch (error) {
        console.error(error);
        res.status(501).json({message:"Server error"});
    }
}

const deleteTodos=async(req:Request,res:Response)=>{
    try {
        const token = (req as CustomRequest).token;
        if(token && typeof token !== "string" && "id" in token){
            const id = req.params.id;
            if(id){
              const deleted= await Todo.destroy({where:{id:id}});
                res.status(200).send({message:"todo deleted successfully",deleted:deleted});
            }
           else{
            res.status(404).json({message:"given todo doesnt exist"});
           }
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({message:"Couldn't delete todo"});
    }
}

const updateTodos=async(req:Request,res:Response)=>{
try{
    const token =(req as CustomRequest).token;
    if(token && typeof token !=="string" && token.id){
        const {title,description} = req.body;
        const id = req.params.id;
        const todo = await Todo.update({name:title,description:description},{where:{id:id}});
    }
}
catch(error){
    console.error(error);
}
}

export {addTodos,getTodos,deleteTodos,updateTodos};