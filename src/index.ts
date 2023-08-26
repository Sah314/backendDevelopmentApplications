import express, { Request, Response } from 'express';
import body_parser from "body-parser";
import sql from "sqlite3";
const app = express();

const db = new sql.Database("database.db");
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));

app.get("/",(req:Request,res:Response)=>{
res.status(200).json({"message":"Success"});

});
app.post("addTodo",(req:Request,res:Response)=>{
    let todo:Object = {name:req.body.name,
        description:req.body.description,
        status:req.body.status};
        res.json(todo);
    }

)

app.listen(3000,()=>{console.log("Listening on port 3000")});