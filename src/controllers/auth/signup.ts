import { Request , Response } from "express"
import { signupSchema } from "../../zod/inputpValidation"
import bcrypt from "bcrypt"
import { prisma } from "../../database/db";





export const SignupPage = async(req:Request ,res:Response)=>{
    const parsedData = signupSchema.safeParse(req.body);
   
    try {

        if(!parsedData.success){
        return res.status(422).json({
            message:"I/p validation failed"
        })
    }

    const { name , email , password ,role} = parsedData.data ;

    const hashedPassword = await bcrypt.hash(password,10) 

    const signupDbData = await prisma.user.create({
        data : {
            name : name ,
            email : email ,
            password : hashedPassword,
            role : role
        }
    })

    return res.status(201).json({
        message:`Successfully registered ${signupDbData.name}`
    })
    
   } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error "
    })
  }


}
