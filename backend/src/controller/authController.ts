import { Request, Response } from "express";
import { client } from "../db/db"; 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { signupSchema,loginSchema } from "../validation/validation";

dotenv.config()

export const signup = async (req:Request,res:Response)=>{
    
   const result = signupSchema.safeParse(req.body);
   
   if(!result.success){
        res.status(400).send({
            message:"invalid format"
        })
        return
    }
      const { username, email, password, image } = result.data;
    try{
      
        const alreadyExist = await client.user.findUnique({
            where:{
                email
            }
        })

        if(alreadyExist){
          return res.status(409).json({
               
            message: "User already exists!",
                            
            });
        }

        const hashedPassword =await bcrypt.hash(password,7)
        
        const response = await client.user.create({
            data:{
                username,
                email,
                password:hashedPassword,
                Image:image
            }
        })

        res.status(200).json({
            message:"account created succesfully !!",
            user:{...response,
                password:null}
        })
        
    }catch(e){
        res.json({
            message:`error in the signup function is :\n${e}`
        })

    }
}


export const signin = async (req:Request,res:Response)=>{
    const result = loginSchema.safeParse(req.body);
     if(!result.success){
        res.status(400).send({
            message:"invalid format"
        })
        return
    }
    const {email,password} = result.data
    
    try{
        const user  = await client.user.findUnique({
            where:{
                email
            }
        })

        const hashedPassword = await bcrypt.compare(password,user?.password as string)

        if(hashedPassword===false){
            res.status(400).json({
                message:"unauthorized"
            })
            return
        }else{
           const JWT_SECRET = process.env.JWT_SECRET
           const token = jwt.sign({ id: user?.Id } ,JWT_SECRET as string)

            res.status(201).json({
                message:"user logged in succesfully !!",
                token
            })
        }
    }catch(e){
        res.status(401).send({
            message:`the error is :\n${e}`
        })
    }
}
